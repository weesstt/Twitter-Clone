import React, { useState } from 'react'
import "./SignUp.css"
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from './firebase.js'
import {setDoc, getDoc, doc} from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth';

const InvalidForms = {
    Email: Symbol("Invalid email!"),
    DisplayName: Symbol("Invalid display name! Display names are required and must be less than 32 characters."),
    Username: Symbol("Invalid username! Usernames can only contain alphanumeric characters with no spaces and must be less than 16 characters."),
    Password: Symbol("Invalid password! Passwords are required and must be less than 64 characters."),
    UsernameTaken: Symbol("That username is already in use! Please choose a different one."),
    AccountExists: Symbol("An account under that email already exists! Please sign in instead."),
    IncorrectPassword: Symbol("Incorrect password!"),
    NoAccountWithCred: Symbol("No account with those credentials exists!"),
    Other: Symbol("Error"),
    None: Symbol("")
}

const SignUpBox = () => {

    const [signIn, setSignIn] = useState(true); //true = show sign in screen, false = show sign up screen
    const [errorMsg, setErrorMsg] = useState(null);

    return (
        <div className='signup__box'>
            {!signIn && 
            <div>
                <input className='signup__form__input' placeholder='Create your name' id="displayNameField"/>
                <input className='signup__form__input' placeholder='Enter your email' id="emailField"/>
                <input className='signup__form__input' placeholder='Create your username' id="usernameField"/>
                <input className='signup__form__input' placeholder='Create your password' type='password' id="passwordField"/>
                <div className='signup__errormsg'>{(errorMsg !== null && errorMsg.description)}</div>
                <button className='signup__form__button' onClick={() => signUp(document.getElementById("displayNameField").value, 
                                                                                document.getElementById("emailField").value, 
                                                                                document.getElementById("usernameField").value,
                                                                                document.getElementById("passwordField").value, setErrorMsg)}>Sign Up</button> 
                <div className='signup__signin__divider'></div>
                <button className='signup__form__button' type='Submit' onClick={() => {setErrorMsg(InvalidForms.None); setSignIn(true);}}>Log In</button>
            </div>}

            {signIn && 
            <div className='signup__form'>
                <input className='signup__form__input' placeholder='Enter your email' id="emailField"/> 
                <input className='signup__form__input' placeholder='Enter your password' type="password" id="passwordField"/>
                <div className='signup__errormsg'>{errorMsg !== null && errorMsg.description}</div>
                <button className='signup__form__button' type='Submit' onClick={() => {firebaseSignIn(document.getElementById("emailField").value,
                                                                                document.getElementById("passwordField").value, setErrorMsg)}}>Log In</button>
                <div className='signup__signin__divider'></div>
                <button className='signup__form__button' type='Submit' onClick={() => {setErrorMsg(InvalidForms.None); setSignIn(false);}}>Sign Up</button>
            </div>}
        </div>
    )
}

async function signUp(displayName, email, username, password, setError){
    if(!validateDisplayName(displayName)) return handleInvalidInput(InvalidForms.DisplayName, setError);
    if(!validateEmail(email)) return handleInvalidInput(InvalidForms.Email, setError);
    if(!validateUsername(username)) return handleInvalidInput(InvalidForms.Username, setError);
    if(!validatePassword(password)) return handleInvalidInput(InvalidForms.Password, setError);

    const usernamesDocRef = doc(db, 'usernames', username);
    const usernamesSnap = await getDoc(usernamesDocRef);

    if(usernamesSnap.exists()){
        return handleInvalidInput(InvalidForms.UsernameTaken, setError);
    }

    const usersDocRef = doc(db, 'users', username);
    const usersSnap = await getDoc(usersDocRef);

    if(usersSnap.exists()){
        return handleInvalidInput(InvalidForms.AccountExists, setError);
    }

    createUserWithEmailAndPassword(auth, email, password).then(
        (user) => {
            setDoc(doc(db, 'users', email), {
                displayName: displayName,
                username: username
            }).catch(
                (error) => {
                    console.log(error);
                }
            );
        
            setDoc(doc(db, 'usernames', username), {}).catch(
                (error) => {
                    console.log(error);
                }
            )
        }
    ).catch(
        (error) => {
            const errorCode = error.code;
            switch(errorCode) {
                case "auth/email-already-in-use": 
                    setError(InvalidForms.AccountExists);
                    break;
                default: 
                    setError(InvalidForms.Other);
            }
        }
    )
}

function firebaseSignIn(email, password, setErrorMsg){
    if(!validateEmail(email)) return;
    if(!validatePassword(password)) return;

    signInWithEmailAndPassword(auth, email, password).catch(
        (error) => {
            const errorCode = error.code;
            switch(errorCode) {
                case "auth/wrong-password": 
                    setErrorMsg(InvalidForms.IncorrectPassword);
                    break;
                case "auth/user-not-found": 
                    setErrorMsg(InvalidForms.NoAccountWithCred);
                    break;
                default: 
                    setErrorMsg(InvalidForms.Other);
            }
        }
    )
}

function validateEmail(email){
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return email.toLowerCase().match(emailRegex);
}

function validateDisplayName(displayName){
    return displayName.length >= 1 && displayName.length <= 32;
}

function validateUsername(username){
    const usernameRegex = /^[a-z0-9]{1,32}$/g;
    return username.toLowerCase().match(usernameRegex);
}

function validatePassword(password){
    return password.length >= 1 && password.length <= 64;
}

function handleInvalidInput(invalidForm, setError){
    setError(invalidForm);
}

export default SignUpBox
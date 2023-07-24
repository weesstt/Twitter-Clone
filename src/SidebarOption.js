import React from "react";
import "./SidebarOption.css";
import {auth} from './firebase.js';
import {signOut} from 'firebase/auth';

//all components are capital
function SidebarOption({active, text, Icon, type}){

    const firebaseSignOut = (e) => {
        signOut(auth).catch(
            (error) => {
                console.log(error);
            }
        )
    };

    return (
        <div className={`sidebarOption ${active && 'sidebarOption--active'}`} onClick={(type === "signOut") && firebaseSignOut}>
        <Icon />
        <h2>{text}</h2>

        </div>
    );
}

export default SidebarOption;
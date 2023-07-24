import React, {useState} from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import {collection, addDoc} from "firebase/firestore";
import {auth, db} from './firebase.js'
import {getDoc, doc} from 'firebase/firestore'

function TweetBox() {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState("");

    const sendTweet = async e => {
        e.preventDefault();

        const userData = await getDoc(doc(db, 'users', auth.currentUser.email)).then(
            (userDoc) => {
                return userDoc.data();
            }
        ).catch((error) => {
            return null;
        })

        if(userData == null){
            alert("Something went wrong, please try again...");
            return;
        }

        addDoc(collection(db, 'posts'), {
            displayName: userData.displayName,
            text: tweetMessage,
            username: userData.username,
            verified: true,
            image: tweetImage,
            avatar: ''
        }).catch(() => {
            alert("Something went wrong, please try again...");
        })

        setTweetMessage("");
        setTweetImage("");
    }

    return (
        <div className="tweetBox">
            <form>
                <div className="tweetBox__input">
                    <Avatar></Avatar>
                    <input value={tweetMessage} 
                    placeholder="What's happening?"
                    onChange={e => setTweetMessage(e.target.value)}></input>
                </div>
                <input placeholder="Optional: Enter Image URL" 
                className="tweetBox__imageInput" 
                type="text"
                value={tweetImage}
                onChange={e => setTweetImage(e.target.value)}></input>
                <Button type="submit" 
                className="tweetBox__tweetButton"
                onClick={sendTweet}>Tweet</Button>
            </form>
        </div>
    )
}

export default TweetBox;
import React, {useState, useEffect} from "react";
import "./Feed.css";
import TweetBox from "./TweetBox.js";
import Post from "./Post.js"
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from './firebase.js'; 
import FlipMove from "react-flip-move";

function Feed(){
    const [posts, setPosts] = useState([]);
            
    useEffect(() => { //run whenever feed component loads and do not run after
        onSnapshot(collection(db, 'posts'), (snapshot) => {
            setPosts(snapshot.docs.map(doc => doc.data()))
        });
    }, []); //[name, age] adding vars here allows it to also run when these change

    return (
        <div className="feed">
            {/* {Header} */}
            <div className="feed__header">
                <h2>Home</h2>    
            </div>

            {/* TweetBox */}
            <TweetBox/>
            
            <FlipMove>
            {posts.map(post => (
                <Post
                    key={post.text} //change this to the firebase doc id
                    displayName={post.displayName}
                    username={post.username}
                    verified={post.verified}
                    text={post.text}
                    avatar={post.avatar}
                    image={post.image}
                />
            ))}
            </FlipMove>
        </div>
    );
}

export default Feed;
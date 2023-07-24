import { ChatBubble, FavoriteBorderSharp, PublishSharp, Repeat, VerifiedUserSharp } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, {forwardRef} from "react";
import "./Post.css";


const Post = forwardRef(({
    displayName, 
    username, 
    verified, 
    text, 
    image, 
    avatar}, ref) => {
    return (
        <div className="post" ref={ref}>
            <div className="post__avatar">
                <Avatar src={avatar}></Avatar>
            </div>

            <div className="post__body">
                <div className="post__body">
                    <div className="post__headerText">
                        <h3>
                            {displayName}{" "}
                            <span className="post__headerSpecial">
                                {verified && <VerifiedUserSharp className="post__badge"></VerifiedUserSharp>}
                                @{username}
                            </span>
                        </h3>
                    </div>

                    <div className="post__headerDescription">
                        <p>{text}</p>
                    </div>
                </div>

                <img src={image}></img>
                
                <div className="post__footer">
                    <ChatBubble fontSize="small" />
                    <Repeat fontSize="small" />
                    <FavoriteBorderSharp fontSize="small" />
                    <PublishSharp fontSize="small" />
                </div>
            </div>
        </div>
    );
});

export default Post;
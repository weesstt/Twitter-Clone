import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption"
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {Button} from "@mui/material"
import { LogoutOutlined } from "@mui/icons-material";
import {auth} from './firebase.js';
import {signOut} from 'firebase/auth';

function Sidebar(){

    return (
        <div className="sidebar">
            {/* {Twitter Icon} */}
            <TwitterIcon className="sidebar__twitterIcon"/>

            <SidebarOption active Icon={HomeIcon} text="Home"/>
            <SidebarOption Icon={SearchIcon} text="Explore"/>
            <SidebarOption Icon={NotificationsNoneIcon} text="Notifications"/>
            <SidebarOption Icon={MailOutlineIcon} text="Messages"/>
            <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks"/>
            <SidebarOption Icon={ListAltIcon} text="Lists"/>
            <SidebarOption Icon={PermIdentityIcon} text="Profile"/>
            <SidebarOption Icon={LogoutOutlined} text="Sign Out" type="signOut"/>

            {/* {Button -> Tweet} */}
            <Button variant="outlined" className="sidebar__tweet" fullWidth>
                Tweet
            </Button>

        </div>
    );
}

export default Sidebar;
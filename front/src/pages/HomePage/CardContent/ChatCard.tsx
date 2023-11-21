import React from "react";
import MessageCard from "./MessageCard";


const ChatCard = () => {

    return (
        <div className="contentHidden">
            <div className="MessageTitleContainer">
                <div className="MessageTitleLogo">
                    Logo
                </div>
                <div className="MessageTitleTextContainer" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <h2 className="MessageTitleText">New Message</h2>
                </div>
                <div className="MessageTitleNbr">
                    <h1 className="MessageTitleText">5</h1>
                </div>
            </div>
            <div className="MessageCardContainer">
            <MessageCard></MessageCard>
            <MessageCard></MessageCard>
            <MessageCard></MessageCard>
            <MessageCard></MessageCard>
            <MessageCard></MessageCard>
            <MessageCard></MessageCard>
            <MessageCard></MessageCard>
            <MessageCard></MessageCard>
            <MessageCard></MessageCard>
            </div>

        </div>
    )
}

export default ChatCard
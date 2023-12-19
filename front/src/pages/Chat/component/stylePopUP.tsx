import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import ChanPassword from '../interface/chanPassword';
import FriendsChat from "./FriendsChat";
import { Account } from "../../../ui/types";
import UserInChannel from "./UserInChannel";
import Channels from "./Channels";
import DirectMessage from "./DirectMessage"
import CreateChannel from "./CreateChannel";
import ChatBoard from "./ChatBoard";
import Message from "../interface/messageDto";

export const PopUp = (param: { currentChannel: string }) => {
	const socket = useSocket();
	const [validData, setValidData] = useState(false);
    const [userInChannel, setUserInChannel] = useState<Account[]>([]);
	const [showAuthWindow, setShowAuthWindow] = useState(false);
	const [data, setData] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [currentChannel, setCurrentChannel] = useState("");
	const [pass, setPass] = useState(""); // a voir chmager le nom
	const [DM_Chann, setDM_Chann] = useState(true); //changer les nom


    function takeChan(channelSet: string, chanStatue: string) {
		setCurrentChannel(channelSet)
		console.log("chann = , current =", channelSet, currentChannel)
		if (chanStatue !== "Public") {
			const password = prompt("what is the PassWord?");//todo enlever le prompt;
			if (socket)
				socket.emit("checkPass", channelSet, password);
		}
		setTimeout(() => {}, 1000);
		if (pass === "ok" || chanStatue === "Public") {	
			if (socket) {
				socket.emit("getChannelMeOne", channelSet, currentChannel);
				setPass("ok")
				setData("");
			}
		}
	}

	return (
		<div className='h-1/5 flex justify-between'>
			<h1 className='w-2/5 items-center flex'>changer de mot de passe</h1>
			<input className='w-20 lg:w-60 text-black m-1'
				type="password"
				name="oldPassword"
				placeholder='ancien mot de passe'
			/>
			<input className='w-20 lg:w-60 text-black m-1'
				type="password"
				name="password"
				placeholder='nouveau mot de passe'
			/>
			<div className='w-10 lg:w-14 flex item-center'>
				{/* {validData &&
					<button onClick={changePass}>valider</button>
				} */}
			</div>
		</div>
	);
};

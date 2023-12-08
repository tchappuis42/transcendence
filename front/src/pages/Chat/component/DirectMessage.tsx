import { useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import { handleMouseEnter, handleMouseLeave } from '../../Friend/interface/Tools';
import { useAccount } from '../../../ui/organisms/useAccount';

interface DMChan {
	id: number;
	name: string
	statue: string;
}

interface Message {
	message: string;
	username: string;
	uId: number
}

interface Props {
	takeChan(channelSet: string): void
	currentChannel: string;
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	data: string;
	disabled: boolean;
	userId: number;
}

const DirectMessage: React.FC<Props> = ({ takeChan, currentChannel, setMessages, data, disabled, userId }) => {
	const socket = useSocket();
	const [all_DMChannels, setDMCHannel] = useState<DMChan[]>([]);
	const [isOn, setIsOn] = useState(false)
	const [bon, setBon] = useState(false)   // bien guez mais il etait 5h du sbarrr
	const {account} = useAccount();

	const handleSwitchChange = (on: any) => {
		console.log(`new switch "on" state:`, isOn)
		if (socket) {
			if (isOn === false)
				socket.emit("DMBlock", currentChannel, true);
			else
				socket.emit("DMBlock", currentChannel, false);
		}
	}


	useEffect(() => {
		setBon(false)
		if (socket) {
			socket.on("getDMChannelMe", (name, status, user) => {
				//setPassword('0');
				setIsOn(status);
				socket.emit("DMmessage", data, name, '1');
				setBon(true)
				//setteur(user);
				//setUserInChannel(user);
			});
			socket.on("createDMChannel", (data, channel) => {
				takeChan(channel);
				setDMCHannel(data);
				setMessages([]);
			});
			socket.on("refreshDMChannel", (data) => {
				console.log("dataa :", data)
				setDMCHannel(data);
			});
		}
		return () => {
			if (socket) {
				socket.off("getDMChannelMe");
				socket.off("createDMChannel");
				socket.off("refreshDMChannel");
			}
		};
	}, [socket, currentChannel]);

	const onClick = () => {
		console.log("oclickckckc")
		setIsOn(!isOn)
	}

	const getUserName = (name : string) => {
		const users = name.split("_");
		if (users[0] !== account.username)
			return users[0];
		if (users[1] !== account.username)
			return users[1];
		
		return ("")
	}

	return (
		<div className="bg-black/50 h-full w-full rounded-md">
		  <div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
			<h1> DM </h1>
		  </div>
		  {!all_DMChannels ? (
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90%" }}>
			  <h1 className='text-white opacity-60'>No Dm</h1>
			</div>
		  ) : (
			<div className="h-[90%] overflow-y-auto overflow-x-hidden">
			  {all_DMChannels.map((msg, id) => (
				<div className="h-1/6 bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
				  <div className="h-full w-full  flex flex-row justify-between px-5 items-center" onClick={() => takeChan(msg.name)}>
				  <h1 className='text-xl w-1/3'>{getUserName(msg.name)}</h1>
					<h1 className='text-xl  w-1/3'>{msg.statue}</h1>
				  </div>
				</div>
			  ))}
			</div>
		  )}
		  {bon && (
			<div className="w-full h-16 mt-2 rounded-md bg-black/60 flex justify-center items-center pt-1 shadow-md shadow-white">
				<div className="  h-full  w-full flex flex-row justify-center items-center">
					<h1 className='text-white text-xl w-1/3 flex items-center justify-end'>Blocked</h1>
					<div className='w-2/3 flex justify-center'>
						<input
						type="checkbox"
						className="checkbox"
						name={"status"}
						id={"status"}
						onClick={onClick}
						onChange={handleSwitchChange}
						checked={isOn}
						disabled={disabled}
						aria-labelledby="switchLabel"
						/>
					<label className="label" htmlFor="status">
					<span className={"innerDM"} />
					</label>
				</div>
			  </div>
			</div>
		  )}
		</div>
	  );
	  
};

export default DirectMessage;
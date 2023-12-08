import { useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';

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

	return (
		<div h-full>
			<div className="textDM"> <h1> DM </h1></div>
			<div className="boxDMchann">
				{all_DMChannels.map((msg, id) => (
					<b className="text_textButonDM" key={id}>
						<div className="text_butonDM" onClick={() => takeChan(msg.name)}>
							{msg.name} : {msg.statue}
						</div>
					</b>
				))}

				{bon && <div className="w-full h-1/5 bg-green-500">
					<div className="containerStatus">
						<li>{"status"}</li>
						<input type="checkbox" className="checkbox"
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
				</div>}
			</div>
		</div>
	);
};

export default DirectMessage;
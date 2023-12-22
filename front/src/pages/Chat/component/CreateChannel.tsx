import React, { SyntheticEvent, useEffect, useState } from 'react';
import { handleMouseEnter, handleMouseLeave } from '../../HomePage/Tools';
import { useSocket } from '../../../ui/organisms/SocketContext';
import { createPortal } from "react-dom";
import ChanInfo from '../interface/chanInfo';
import "./card.css"

const CreateChannel: React.FC<{ currentChannel: string }> = (currentChannel) => {

	const socket = useSocket();
	const [createchan, setCreatChan] = useState(false);
	const [data, setData] = useState<ChanInfo>({ channelName: "", password: "" });
	const [validData, setValidData] = useState(false)

	const createchannel = (e: SyntheticEvent) => {
		e.preventDefault();
		if (socket) {
			socket.emit("createchannel", data.channelName, currentChannel, data.password);
		}
		resetData();
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	const resetData = () => {
		setData({ channelName: "", password: "" })
		setCreatChan(false)
	}

	useEffect(() => {
		var username = data.channelName;
		var password = data.password;
		if ((username.length > 0 && username.length < 9) && (password.length > 0 && password.length < 17)) {
			setValidData(true)
		}
		else
			setValidData(false)

	}, [data]);


	return (
		<div className="w-full h-full flex justify-center item-center pt-5">
			<button onClick={() => setCreatChan(true)} className="chat-button w-[80%] h-[60%] max-w-[200px]"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}>
				<h1 className="text-black/40 hover:text-white text-xl lg:text-2xl">Create Channel</h1>
			</button>
			{createchan &&
				createPortal(
					<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-40">
						<div className="w-96 h-96 rounded-lg px-8 pb-8 pt-6 bg-gray-900 text-white">
							<div className="h-1/5 w-full flex flex-col">
								<button onClick={resetData} className="h-10 flex items-start justify-end">
									<h1 className="text-red-500 font-bold">X</h1>
								</button>
								<h1 className='text-3xl flex font-semibold items-center justify-center'>creer un channel</h1>
							</div>
							<div className='h-[30%] flex justify-center flex-col ml-12'>
								<h1 className='font-semibold'>Nom du Channel</h1>
								<input className='w-60 text-black'
									type="text"
									name="channelName"
									value={data.channelName}
									onChange={handleChange}
									placeholder='channel name'
								/>
								<h1 className='text-sm'>entre 1 et 8 catactere</h1>
							</div>
							<div className='h-[30%] flex justify-center flex-col ml-12'>
								<h1 className='font-semibold'>Mot de Passe</h1>
								<input className='w-60 text-black'
									type="password"
									name='password'
									value={data.password}
									onChange={handleChange}
									placeholder='password'
								/>
								<h1>entre 1 et 17 caractere</h1>
							</div>
							<div className='h-1/5 flex justify-center items-center'>
								{validData &&
									<button onClick={createchannel}>valider</button>
								}
							</div>
						</div>
					</div>,
					document.body
				)
			}
		</div>

	);
};

export default CreateChannel;
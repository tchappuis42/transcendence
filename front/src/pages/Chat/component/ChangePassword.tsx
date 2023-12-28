import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import ChanPassword from '../interface/chanPassword';

const ChangePassword: React.FC<{ currentChannel: string }> = (currentChannel) => {

	const socket = useSocket();
	const [data, setData] = useState<ChanPassword>({ oldPassword: "", password: "" });
	const [validData, setValidData] = useState(false)

	const changePass = (e: SyntheticEvent) => {
		e.preventDefault();
		if (socket) {
			socket.emit("changePass", currentChannel.currentChannel, data.oldPassword, data.password);
		}
		resetData();
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	const resetData = () => {
		setData({ oldPassword: "", password: "" })
	}

	useEffect(() => {
		var password = data.password;
		var oldPassword = data.oldPassword;
		if ((password.length > 0 && password.length < 17) && (oldPassword.length > 0 && oldPassword.length < 17)) {
			setValidData(true)
		}
		else
			setValidData(false)

	}, [data]);

	return (
		<div className='h-1/5 flex justify-between rounded'>
			<h1 className='w-2/5 items-center flex'>changer de mot de passe</h1>
			<input className='w-20 lg:w-60 text-black m-1'
				type="password"
				name="oldPassword"
				value={data.oldPassword}
				onChange={handleChange}
				placeholder='	ancien mot de passe '
			/>
			<input className="w-20 lg:w-60 text-black m-1"
				type="password"
				name="password"
				value={data.password}
				onChange={handleChange}
				placeholder='	nouveau mot de passe '
			/>
			<div className='w-10 lg:w-14 flex item-center'>
				{validData &&
					<button onClick={changePass}>valider</button>
				}
			</div>
		</div>
	);
};

export default ChangePassword;
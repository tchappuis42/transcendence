
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import ChanPassword from '../interface/chanPassword';

import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Checkbox,
	Button,
  } from "@material-tailwind/react";
  
  interface Props {
	callback(pwd: string) : void;
	name: string,
	closeForm() : void;
  }

  export function SimpleRegistrationForm({callback, name, closeForm} : Props) {
	const [password, setPassword] = useState("");

	return (
		<div className={``}>
			<Card className="m-5 w-[400px] flex justify-center bg-opacity-80 rounded-lg p-8 bg-gray-900 z-50">
				<h1 color="blue-gray" className="m-2 flex justify-center text-white font-bold">
					{name}
				</h1>
				<CardBody className="p-5 flex flex-col gap-4">
					<Input
						type="password"
						size="md"
						placeholder="	password"
						// placeholder="********"
						className="!border-t-blue-gray-200 focus:!border-t-gray-900 rounded font-bold"
						labelProps={{
							className: "before:content-none after:content-none",
						}}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</CardBody>
				<CardFooter className="flex item-center justify-center p-5 h-20 mt-10 space-x-4">
					<Button variant="outlined" onClick={() => {callback(password); closeForm()}} fullWidth className="h-full w-[200px] text-white font-bold">
						Sign In
					</Button>
					<Button variant="outlined" onClick={() => {closeForm()}} fullWidth className="h-full w-[200px] text-white font-bold">
						Close
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
  }

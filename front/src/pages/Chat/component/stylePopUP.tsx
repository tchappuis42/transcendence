
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
  import { useEffect, useState } from 'react';
     
  interface Props {
	callback(pwd: string) : void;
	name: string
  }

  export function SimpleRegistrationForm({callback, name} : Props) {
	const [password, setPassword] = useState("");
	const [showmodal, setShowModal] = useState(true);

	const handlemodal = () => {
		setShowModal(true);
	}
	
	const closeModal = () => {
		setShowModal(false);
	}
	return (
		<div className={`overlay ${!showmodal?`overlay-none`:``}`}>
			<Card className="m-5 w-[400px] bg-green-200 flex justify-center">
				<Typography variant="lead" color="blue-gray" className="m-2 flex justify-center">
					{name}
				</Typography>
				<CardBody className="p-5 flex flex-col gap-4">
					<Input
						type="password"
						size="md"
						placeholder="	password"
						// placeholder="********"
						className="!border-t-blue-gray-200 focus:!border-t-gray-900 rounded"
						labelProps={{
							className: "before:content-none after:content-none",
						}}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</CardBody>
				<CardFooter className="flex item-center justify-center p-5 h-20">
					<Button onClick={() => {callback(password); closeModal()}} variant="filled" fullWidth className="h-full w-[200px]">
						Sign In
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
  }

import axios from "axios";
import { useAccount } from "../ui/organisms/useAccount";
import { useEffect, useState } from "react";


const Hometest = () => {
	const { account } = useAccount()

	const [qrcode, setqr] = useState("")

	return (
		<div className="flex h-screen" >
			<h1 className="text-3xl font-bold underline">salut {account.username}</h1>
			< div className="divtest" >
				<img src={qrcode} />
			</div >
		</div >

	)
};
export default Hometest;

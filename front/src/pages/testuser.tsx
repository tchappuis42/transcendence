import axios from "axios";
import { useAccount } from "../ui/organisms/useAccount";
import { useEffect, useState } from "react";


const Testuser = () => {
	const { account } = useAccount()

	const [qrcode, setqr] = useState("")

	return (
		<div className="divtest">
			<h1>salut {account.username}</h1>
			<div className="divtest">
				<img src={qrcode} />
			</div>
		</div>

	)
};
export default Testuser;

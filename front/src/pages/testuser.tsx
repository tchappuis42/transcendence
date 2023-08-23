import axios from "axios";
import { useAccount } from "../ui/organisms/useAccount";
import { useEffect, useState } from "react";


const Testuser = () => {
	const { account } = useAccount()

	const [qrcode, setqr] = useState("")

	useEffect(() => {
		axios.get("http://localhost:4000/user/2fa", { withCredentials: true })
			.then((response) => {
				setqr(response.data);
			})
			.catch((error) => {
				console.error("Erreur lors de la requête Axios :", error);
			});
	}, []);

	return (
		<div className="divtest">
			<h1>salut {account.username}</h1>
			<div className="divtest">
				<h1>qrcode = {qrcode}</h1>
			</div>
		</div>

	)
};
export default Testuser;

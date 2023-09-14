import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { useAuth } from "../../ui/organisms/useAuth";

interface TwoFaFormProps {
	settingPage: (newPage: string) => void;
}

const TwoFaForm: React.FC<TwoFaFormProps> = ({
	settingPage,
}) => {

	const { authenticate } = useAuth();

	const [token, setToken] = useState("");

	const qrCodeSubmit = (e: SyntheticEvent) => {
		e.preventDefault();


		const requestData = {
			token: token
		};

		axios.post("http://localhost:4000/authentication/twoFa", requestData, { withCredentials: true }).then((response) => {
			authenticate();
		})
			.catch((error) => {
				alert(error)
			});
	}

	return (
		<form onSubmit={qrCodeSubmit} id="form">
			<h1 className='text'>code qrcode</h1>
			<label htmlFor="text">
				<input className='input'
					type="number"
					name="code"
					value={token}
					onChange={e => setToken(e.target.value)}
					placeholder='code'
				/>
			</label>
			<button type="submit" className='button'>send</button>
			<button onClick={() => settingPage("login")}>x</button>
		</form>
	);
};
export default TwoFaForm;
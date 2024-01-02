import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { useAuth } from "../../ui/organisms/useAuth";
import { Button } from "@material-tailwind/react";

interface TwoFaFormProps {
	settingPage: (newPage: string) => void;
	onSubmit?: () => void;
}

const TwoFaForm: React.FC<TwoFaFormProps> = ({ settingPage, onSubmit }) => {

	const { authenticate } = useAuth();
	const [token, setToken] = useState("");
	const [errorMessage, setErrorMessage] = useState<string>();

	const qrCodeSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const requestData = {
			token: token
		};
		axios.post("/api/authentication/twoFa", requestData, { withCredentials: true }).then((response) => {
			authenticate();
			onSubmit?.()
		})
			.catch((error) => {
				setErrorMessage("Wrong code");
			});
	}

	return (
		<div className="flex items-center justify-center h-screen w-full">
			<form onSubmit={qrCodeSubmit} className="w-[450px] h-[550px] bg-black/80 rounded-4xl shadow-md flex flex-col  items-center shadow">
				<div className="w-full h-1/6 flex flex-row-reverse mr-20">
					<button onClick={() => settingPage("login")} className="text-gray-500 hover:text-gray-800 rounded-full">
						<h1 className="text-red-500/60 font-bold text-4xl">X</h1>
					</button>
				</div>
				<div className="w-full h-2/6 flex justify-center items-center" >
					<h1 className='text-white text-5xl'>Enter your code</h1>
				</div>
				<div className="w-full h-1/6  flex flex-col  justify-center items-center" >
					{errorMessage &&
						<h2 className="text-red-500">{errorMessage}</h2>}
					<label htmlFor="text" className="flex justify-center items-center">
						<input className='input'
							type="number"
							name="code"
							value={token}
							onChange={e => setToken(e.target.value)}
							placeholder='code'
						/>
					</label>
				</div>
				<div className="w-full h-1/6  mt-5 flex justify-center items-center" >
					<button type="submit" className="border-2 w-1/3 mt-2 border-white hover:bg-slate-100 hover:text-black text-white font-bold  rounded-full shadow-black shadow-xl hover:transform hover:scale-110 transition duration-300">
						<h1 className="text-white hover:text-black">Send</h1>
					</button>
				</div>
			</form>
		</div>
	);
};
export default TwoFaForm;
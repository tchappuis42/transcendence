import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import TwoFaForm from './TwofaForm';
import axios from 'axios';

const Login = () => {
	const [data, setData] = useState({
		password: "",
		identifiant: "",
		twoFa: false
	});

	const [page, setPage] = useState("login");

	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	const settingPage = (newPage: string) => {
		setShowPassword(false)
		setPage(newPage)
	}

	const togglePassword = () => {
		setShowPassword(!showPassword)
	}

	const toggletfa = () => {
		setData({ ...data, twoFa: !data.twoFa })
	}

	const handleApiLoginClick = async () => {
		try {
			const response = await axios.get("/api/authentication/url");
			if (response.data.statusCode === 302) {
				window.location.href = response.data.url;
			} else {
				console.error('Unexpected response', response.data);
			}
		} catch (error) {
			console.error('Error fetching URL', error);
		}
	};

	return (
		<div className="flex h-screen items-center justify-center w-full min-h-[600px] ">
			{page === 'login' && (
				<div className="flex flex-col items-center justify-center h-screen w-screen">
					<div className='w-1/2 h-1/2  rounded border border-white/50 flex justify-evenly items-center flex-col'>
						<h1 className='text-white font-bold text-3xl'>Welcome to the new Pong Experience</h1>
						<button onClick={handleApiLoginClick} type="button"
							className="border-2 mt-2 w-40 border-white hover:bg-slate-100 hover:text-black text-white font-bold  rounded-full shadow-black shadow-xl hover:transform hover:scale-110 transition duration-300">
							Api Login
						</button>
					</div>
				</div>
			)}
			{/* {page === 'signup' && (
				<SignupForm
					data={data}
					handleChange={handleChange}
					settingPage={settingPage}
					showPassword={showPassword}
					togglePassword={togglePassword}
					toggletfa={toggletfa}
				/>
			)} */}
			{page === 'twofa' && (
				<TwoFaForm
					settingPage={() => setPage("login")}
				/>
			)}
		</div>
	)
};
export default Login;
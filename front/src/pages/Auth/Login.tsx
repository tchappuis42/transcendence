import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import TwoFaForm from './TwofaForm';

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

	return (
		<div className="flex h-screen items-center justify-center w-full min-h-[600px]">
			{page === 'login' && (
				<LoginForm
					data={data}
					handleChange={handleChange}
					settingPage={settingPage}
					showPassword={showPassword}
					togglePassword={togglePassword}
				/>
			)}
			{page === 'signup' && (
				<SignupForm
					data={data}
					handleChange={handleChange}
					settingPage={settingPage}
					showPassword={showPassword}
					togglePassword={togglePassword}
					toggletfa={toggletfa}
				/>
			)}
			{page === 'twofa' && (
				<TwoFaForm
					settingPage={() => setPage("login")}
				/>
			)}
		</div>
	)
};
export default Login;
import React, { SyntheticEvent } from "react";
import { useAuth } from '../../ui/organisms/useAuth';
import FormProps from './interface/FormDto';

const LoginForm: React.FC<FormProps> = ({
	data,
	handleChange,
	settingPage,
	showPassword,
	togglePassword
}) => {

	const { login } = useAuth();

	const loginSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		try {
			const twofa = await login(data.identifiant, data.password);

			if (twofa) {
				settingPage("twofa")
			}
		} catch (error) {
		}
	};

	return (
		<div className="flex min-w-112 min-h-125 w-112 h-125 shadow-black shadow-xl rounded-4xl items-center flex-col text-center" >
			<form onSubmit={loginSubmit} className="w-full h-full">
				<h1 className="text-7xl my-10" >Login</h1>
				<label htmlFor="text">
					<input className='w-11/12 h-14 rounded-3xl pl-5'
						type="text"
						name="identifiant"
						value={data.identifiant}
						onChange={handleChange}
						placeholder='identifiant'
					/>
				</label>
				<label htmlFor="password">
					<input className='w-11/12 h-14 rounded-3xl my-5 pl-5'
						type={showPassword ? "text" : "password"}
						name="password"
						value={data.password}
						onChange={handleChange}
						placeholder='password'
					/>
				</label>
				<div className="text-start ml-5">
					<input type="checkbox" onClick={togglePassword}></input>
					<a className="text-lg ml-2 text-white">show password</a>
				</div>
				<button type="submit" className="bg-transparent hover:bg-slate-100 hover:text-black text-white font-bold py-2 px-4 rounded-full w-28 h-16 shadow-black shadow-xl">
					Login
				</button>
				<div className='text-2xl text-start ml-5 flex mt-5 text-white'>
					Don't have an account?
					<span onClick={() => settingPage("signup")} >
						<p className="cursor-pointer ml-2">Signup</p>
					</span>
				</div>
			</form>
		</div>
	);
};
export default LoginForm;
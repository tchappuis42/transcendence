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
			const twofa = await login(data.email, data.password);

			if (twofa) {
				settingPage("twofa")
			}
		} catch (error) {
		}
	};

	return (
		<form onSubmit={loginSubmit} id={"form"}>
			<h1 className='text'>Login</h1>
			<label htmlFor="email">
				<input className='input'
					type="email"
					name="email"
					value={data.email}
					onChange={handleChange}
					placeholder='email@exemple.com'
				/>
			</label>
			<label htmlFor="password">
				<input className='input'
					type={showPassword ? "text" : "password"}
					name="password"
					value={data.password}
					onChange={handleChange}
					placeholder='password'
				/>
				<input type="checkbox" onClick={togglePassword}></input>
				<a>show password</a>
			</label>
			<button type="submit" className='button'>Login</button>
			<div className='divtest'>
				Don't have an account?
				<span onClick={() => settingPage("signup")} >
					<p className='p'>Signup</p>
				</span>
			</div>
		</form>
	);
};
export default LoginForm;
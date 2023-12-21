import axios from 'axios';
import React, { SyntheticEvent, useState } from "react";
import FormProps from './interface/FormDto';

const SignupForm: React.FC<FormProps> = ({
	data,
	handleChange,
	settingPage,
	showPassword,
	togglePassword,
	toggletfa
}) => {

	const [qrCode, setQrCode] = useState("");
	const signupSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		axios.post("/api/authentication/signup", data).then((response) => {
			if (response.data.message) {
				alert("user create")
				settingPage("login")
			}
			else
				setQrCode(response.data)
		})
			.catch((error) => {
				alert("user dejs utiliser")
			});
	};

	return (
		<div>
			{qrCode !== "" &&
				<div className="divtest">
					<img src={qrCode} />
					<button onClick={() => settingPage("login")}>x</button>
				</div>}
			{qrCode === "" &&
				<form onSubmit={signupSubmit} id="formsignup">
					<h1 className='text'>Signup</h1>
					<label htmlFor="text">
						<input className='input'
							type="text"
							name="identifiant"
							value={data.identifiant}
							onChange={handleChange}
							placeholder='user'
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
						<div>
							<input type="checkbox"
								checked={data.twoFa}
								onClick={toggletfa}></input>
							2Fa
						</div>
					</label>
					<button type="submit" className='button'>Login</button>
					<div className='divtest'>
						Don't have an account?
						<span onClick={() => settingPage("login")} >
							<p className='p'>login</p>
						</span>
					</div>
				</form>}
		</div>
	);
};
export default SignupForm;
import { useState } from 'react';
import React, { SyntheticEvent } from "react";
import { useAuth } from '../ui/organisms/useAuth';
import axios from 'axios';

const Login = () => {
	const { login } = useAuth();

	const [data, setData] = useState({
		email: "",
		password: "",
		username: "",
		twoFa: false
	});

	const [page, setPage] = useState(true);
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	const loginSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		login(data.email, data.password);
	};

	const signupSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		axios.post("http://localhost:4000/authentication/signup", data).then((response) => {
			if (response.data.message) {
				alert("user create")
				setPage(true)
			}
			else
				alert(response.data) // mettre une page en avant avec le qrcode et la prosedure

		})
			.catch((error) => {
				alert("user dejs utiliser")
			});
	};

	const settingPage = () => {
		setPage(!page)
		setShowPassword(false)
		setData({ ...data, twoFa: false })
	}

	const togglePassword = () => {
		setShowPassword(!showPassword)
	}

	const toggletfa = () => {
		setData({ ...data, twoFa: !data.twoFa })
	}

	return (
		<div className='signup'>
			<form onSubmit={page ? loginSubmit : signupSubmit} id={page ? "form" : "formsignup"}>
				<h1 className='text'>{page ? "Login" : "Signup"}</h1>
				{!page &&
					<label htmlFor="text">
						<input className='input'
							type="text"
							name="username"
							value={data.username}
							onChange={handleChange}
							placeholder='user'
						/>
					</label>}
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
					{!page &&
						<div>
							<input type="checkbox" onClick={toggletfa}></input>
							2Fa
						</div>}
				</label>
				<button type="submit" className='button'>Login</button>
				<div className='divtest'>
					Don't have an account?
					<span onClick={settingPage} >
						<p className='p'>{page ? "signup" : "login"}</p>
					</span>
				</div>
			</form>
		</div >
	);
};
export default Login;
import { useState } from 'react';
import React, { SyntheticEvent } from "react";
import { useAuth } from '../ui/organisms/useAuth';
import axios from 'axios';

const Login = () => {
	const { login } = useAuth();

	const [data, setData] = useState({
		email: "",
		password: "",
		username: ""
	});

	const [page, setPage] = useState("login");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	const loginSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		login(data.email, data.password);
	};

	const signupSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		axios.post("http://localhost:4000/user/signup", data).then((response) => {
			setPage("login")
		});
	};

	if (page === "login") {
		return (
			<div className='signup'>
				<form onSubmit={loginSubmit} id="form">
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
							type="password"
							name="password"
							value={data.password}
							onChange={handleChange}
							placeholder='password'
						/>
					</label>
					<button type="submit" className='button'>Login</button>
					<div className='divtest'>
						Don't have an account?
						<span onClick={() => setPage("signup")}>
							<p className='p'>signup</p>
						</span>
					</div>
				</form>
			</div >
		);
	}
	else
		return (
			<div className='signup'>
				<form onSubmit={signupSubmit} id="formsignup">
					<h1 className='text'>Signup</h1>
					<label htmlFor="text">
						<input className='input'
							type="text"
							name="username"
							value={data.username}
							onChange={handleChange}
							placeholder='user'
						/>
					</label>
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
							type="password"
							name="password"
							value={data.password}
							onChange={handleChange}
							placeholder='password'
						/>
					</label>
					<button className='button' type="submit">Signup</button>
					<div className='divtest'>
						Already have an account?
						<span onClick={() => setPage("login")}>
							<p className='p'>login</p>
						</span>
					</div>
				</form>
			</div >
		);
};
export default Login;
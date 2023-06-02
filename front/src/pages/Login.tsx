import Navigation from '../ui/organisms/Navigation';
import axios from 'axios';
import { useState } from 'react';
import React, { SyntheticEvent } from "react";

const Login = () => {
	const [data, setData] = useState({
		email: "",
		password: ""
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const userData = {
			email: data.email,
			password: data.password,
		};
		axios.post("http://localhost:4000/user/login", userData).then((response) => {
			console.log(response.status, response.data.token);
		})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<h1>Login page</h1>
			<form onSubmit={handleSubmit} className='form'>
				<label htmlFor="email">
					Email
					<input
						type="email"
						name="email"
						value={data.email}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="password">
					Password
					<input
						type="password"
						name="password"
						value={data.password}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">Login</button>
			</form>
		</div >
	);
};
export default Login;
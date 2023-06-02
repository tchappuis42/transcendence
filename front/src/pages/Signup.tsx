import Navigation from '../ui/organisms/Navigation';
import axios from 'axios';
import { useState } from 'react';
import React, { SyntheticEvent } from "react";



const Signup = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		username: ""
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const userData = {
			email: data.email,
			password: data.password,
			username: data.username
		};
		axios.post("http://localhost:4000/user/signup", userData).then((response) => {
			console.log(response.status, response.data.token);
		});
	};

	return (
		<div>
			<h1>Signup page</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="text">
					Username
					<input
						type="text"
						name="username"
						value={data.username}
						onChange={handleChange}
					/>
				</label>
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
				<button type="submit">Signup</button>
			</form>
		</div >
	);
};
export default Signup;
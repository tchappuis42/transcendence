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
		<div className='signup'>
			<form onSubmit={handleSubmit} id="form">
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
			</form>
		</div >
	);
};
export default Signup;
import Navigation from '../ui/organisms/Navigation';
import axios from 'axios';
import { useState } from 'react';
import React, { SyntheticEvent } from "react";
import { Link, redirect } from 'react-router-dom';
import { useAuth } from '../ui/organisms/useAuth';

const Login = () => {
	const { login } = useAuth()
	const [data, setData] = useState({
		email: "",
		password: ""
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		/*axios.post("http://localhost:4000/user/login", data, { withCredentials: true }).then((response) => {
			console.log(response.status, response.data.token);
		})
			.catch((error) => {
				console.log(error);
			});*/
		login(data.email, data.password);
	};

	return (
		<div className='signup'>
			<form onSubmit={handleSubmit} id="form">
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
				<Link to="/signup">Signup</Link>
			</form>
		</div >
	);
};
export default Login;
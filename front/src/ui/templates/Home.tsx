import React, { useEffect } from 'react';
import { Outlet, redirect } from 'react-router-dom';
import Navigation from '../organisms/Navigation';
import Login from '../../pages/Login';
import { AuthStatus, useAuth } from '../organisms/useAuth';
import Testuser from '../../pages/testuser';


const navigationOptions = [
	{ label: 'home', url: '/' },
	{ label: 'test', url: '/test' },
	{ label: 'pong', url: '/pong' },
];

const Home = () => {
	const { status, authenticate } = useAuth();
	useEffect(() => {
		authenticate();
	}, []);

	if (status === AuthStatus.Unknown) {
		return <div></div>
	}
	if (status === AuthStatus.Guest) {
		return <Login />
	}

	else {
		return <div>
			<Navigation options={navigationOptions} />
			<Testuser />
		</div>
	}
};

export default Home;


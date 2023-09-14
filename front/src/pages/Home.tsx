import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../ui/organisms/Navigation';
import Login from './Auth/Login';
import { AuthStatus, useAuth } from '../ui/organisms/useAuth';
import Testuser from './testuser';
import { io } from 'socket.io-client';
import { SocketProvider } from '../ui/organisms/SocketContext';


const navigationOptions = [
	{ label: 'home', url: '/' },
	{ label: 'test', url: '/test' },
	{ label: 'chat', url: '/chat' },
	{ label: 'pong', url: '/pong' },
];

const Home = () => {
	const { status, authenticate } = useAuth();
	const location = useLocation();

	useEffect(() => {
		authenticate();
	}, []);

	if (status === AuthStatus.Unknown) {
		return <div></div>
	}

	if (status === AuthStatus.Guest) {
		return <Login />
	}

	if (location.pathname === '/') {
		return (
			<div>
				<Navigation options={navigationOptions} />
				<Testuser />
			</div >
		);
	}

	return <div>
		<Navigation options={navigationOptions} />
		<Outlet />
	</div>
};

export default Home;


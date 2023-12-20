import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Login from './Auth/Login';
import { AuthStatus, useAuth } from '../ui/organisms/useAuth';
import { TopBar } from "./topBar/topBar";
import Hometest from './HomePage/HomePage';

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
				<TopBar />
				<Hometest />
			</div >
		);
	}

	return <div>
		<TopBar />
		<Outlet />
	</div>
};

export default Home;


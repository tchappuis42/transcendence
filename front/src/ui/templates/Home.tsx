import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../organisms/Navigation';

const navigationOptions = [
	{ label: 'Home', url: '/' },
	{ label: 'login', url: '/login' },
	{ label: 'signup', url: '/signup' },
	{ label: 'pong', url: '/pong' },
];

const Home = () => {
	return <div>
		<Navigation options={navigationOptions} />
		<Outlet />
	</div>
};

export default Home;
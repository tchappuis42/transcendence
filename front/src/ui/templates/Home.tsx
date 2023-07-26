import React from 'react';
import { Outlet, redirect } from 'react-router-dom';
import Navigation from '../organisms/Navigation';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Test from '../../pages/test';


const navigationOptions = [
	{ label: 'login', url: '/login' },
	{ label: 'signup', url: '/signup' },
	{ label: 'pong', url: '/pong' },
];

const Home = () => {
	var a = 1;
	if (a === 1) {
		return (
			Login()
		)
	}
	else {
		return <div>
			<Navigation options={navigationOptions} />
			<Outlet />
		</div>
	}
};

export default Home;


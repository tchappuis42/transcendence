import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../organisms/Navigation';

const navigationOptions: Option[] = [
	{

	}
]

const Home = () => {
	return <div id="home">
		<Navigation />
		<Outlet />
	</div>
};

export default Home;
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
	return (
		<div>
			<div className="navigation">
				<ul>
					<NavLink to="/">
						<li>acceuil</li>
					</NavLink>
					<NavLink to="/login">
						<li>login</li>
					</NavLink>
					<NavLink to="/signup">
						<li>signup</li>
					</NavLink>
					<NavLink to="/pong">
						<li>pong</li>
					</NavLink>
				</ul>
			</div>
		</div>
	);
};

export default Navigation;
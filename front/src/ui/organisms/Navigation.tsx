import React from 'react';
import { Link, NavLink } from 'react-router-dom';

type Props = {
	options: Option[];
};

export type Option = {
	label: string,
	url: string
};

const NavigationItem = ({ option }: { option: Option }) => {
	const currentPath = window.location.pathname;
	return <Link to={option.url} className={currentPath === option.url ? 'active' : 'link'}>
		{option.label}
	</Link >
}

const Navigation = ({ options }: Props) => {
	return (
		<div id="header">
			{
				options.map((option) => <NavigationItem option={option} key={option.url} />)
			}
		</div>
	);
};

export default Navigation;
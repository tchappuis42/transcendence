import React from 'react';
import { Link, NavLink } from 'react-router-dom';

type Props = {
	options: Option[]
}

export type Option = {
	label: string,
	url: string
}

const NavigationItem = ({ option }: { option: Option }) => {
	return <Link to={option.url}>
		{option.label}
	</Link>
}

const Navigation = ({ options }: Props) => {
	return (
		<div id="header">
			{
				options.map((option) => <NavigationItem option={option} />)
			}
		</div>
	);
};

export default Navigation;
import React, { SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';
import NavDropDown from './NavDropDown';

type Props = {
	options: Option[];
};

export type Option = {
	label: string,
	url: string
};

const NavigationItem = ({ option }: { option: Option }) => {
	return <NavLink to={option.url} className='text-white aria-[current=page]:text-blue-400'>
		{option.label}
	</NavLink >
}

const Navigation = ({ options }: Props) => {
	return (
		<div className="flex h-16 justify-around flex-row p-2.5 bg-white/20 items-center">
			{
				options.map((option) => <NavigationItem option={option} />)
			}
			<NavDropDown />
		</div>
	);
};

export default Navigation;
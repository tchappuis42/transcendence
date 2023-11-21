import React, { SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
	options: Option[];
};

export type Option = {
	label: string,
	url: string
};

const NavigationItem = ({ option }: { option: Option }) => {
	return <NavLink to={option.url} className='link aria-[current=page]:text-blue-400'>
		{option.label}
	</NavLink >
}

const Navigation = ({ options }: Props) => {
	return (
		<div className="header">
			{
				options.map((option) => <NavigationItem option={option} />)
			}
		</div>
	);
};

export default Navigation;
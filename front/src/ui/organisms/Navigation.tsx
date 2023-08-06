import React, { SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './useAuth';

type Props = {
	options: Option[];
};

export type Option = {
	label: string,
	url: string
};

const NavigationItem = ({ option }: { option: Option }) => {
	return <NavLink to={option.url} className='link'>
		{option.label}
	</NavLink >
}

const Navigation = ({ options }: Props) => {
	//const { account } = useAccount()
	const { logout } = useAuth();
	const LogoutSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		logout();
	}
	return (
		<div className="header">
			{
				options.map((option) => <NavigationItem option={option} />)
			}
			<button onClick={LogoutSubmit}>logout</button>
		</div>
	);
};

export default Navigation;
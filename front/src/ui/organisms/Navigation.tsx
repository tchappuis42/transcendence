import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSocket } from "./SocketContext";

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
	const location = useLocation();


	const [currentPage, setCurrentPage] = useState<string>(location.pathname);
	const [previousPage, setPreviousPage] = useState<string>("");
	const socket = useSocket();

	useEffect(() => {
		setPreviousPage(currentPage);
		setCurrentPage(location.pathname);
	}, [location, currentPage, previousPage]);

	if (previousPage === '/chat' && currentPage !== '/chat') {
		socket?.emit("leaveChat");
	}

	return (
		<div className="header">
			{
				options.map((option) => <NavigationItem key={option.url} option={option} />)
			}
		</div>
	);
};
export default Navigation;
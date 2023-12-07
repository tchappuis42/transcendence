import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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

    React.useEffect(() => {
        setPreviousPage(currentPage);
        setCurrentPage(location.pathname);
		
    }, [location]);

	if (previousPage === '/chat' && currentPage !== '/chat')
		socket?.emit("leaveChat");
	
	return (
		<div className="header">
			{
				options.map((option) => <NavigationItem option={option} />)
			}
		</div>
	);
};
export default Navigation;
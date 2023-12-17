import React from 'react';
import { Account } from '../../../ui/types';
import { handleMouseEnter, handleMouseLeave } from '../../HomePage/Tools';

interface Props {
	userInChannel: Account[];
}

const GameInvit: React.FC<Props> = ({ userInChannel }) => {
	return (
		<div className='flex justify-center items-center h-[10%]'>
			{userInChannel.length > 1 &&
				< button className="w-2/3 h-2/3 shadow-md shadow-white bg-black/60 rounded hover:bg-white"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}>
					<h1 className="text-white hover:text-black text-xl lg:text-2xl">Create Channel</h1>
				</button>
			}
		</div >
	);
};

export default GameInvit;
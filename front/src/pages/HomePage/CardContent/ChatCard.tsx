import { useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import { handleMouseEnter, handleMouseLeave } from '../../Friend/interface/Tools';
import { useAccount } from '../../../ui/organisms/useAccount';
import { useNavigate } from 'react-router-dom';
import { Account } from '../../../ui/types';

interface DMChannel {
    id: number;
    name: string;
    statue: string;
    user: Account[];
}

const ChatCard = () => {
    const socket = useSocket();
    const [all_DMChannels, setDMCHannel] = useState<DMChannel[]>([]);
    const { account } = useAccount();
    const navigate = useNavigate();

    useEffect(() => {
        if (socket) {
            socket.emit("refreshDMChannel")
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on("getDMChannelMe", (name, status, user) => {
                socket.emit("DMmessage", " ", name, '1');
            });
            socket.on("refreshDMChannel", (data) => {
                setDMCHannel(data);
            });
        }
        return () => {
            if (socket) {
                socket.off("getDMChannelMe");
                socket.off("refreshDMChannel");
            }
        };
    }, [socket]);

    const getUserName = (users: Account[]) => {  //todo
        const userName = users.find(user => user.id !== account.id)
        return (userName?.username)
    }

    function takeChan(channelSet: string) {
        if (socket) {
            socket.emit("getDMChannelMe", channelSet, "create a channel!");
        }
        navigate("/chat");
    }

    return (
        <div className="m-card bg-gray-200/60">
            <div className='header-card'>
                <h1> DM </h1>
            </div>
            {!all_DMChannels ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90%" }}>
                    <h1 className='text-white opacity-60'>No Dm</h1>
                </div>
            ) : (
                <div className="body-card">
                    {all_DMChannels.map((msg, id) => (
                        <div className="h-1/6 bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="h-full w-full grid grid-cols-2 px-5 items-center" onClick={() => takeChan(msg.name)}>
                                <h1 className='text-xl flex justify-center w-full'>{getUserName(msg.user)}</h1>
                                <h1 className='text-xl flex justify-center'>{msg.statue}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChatCard;
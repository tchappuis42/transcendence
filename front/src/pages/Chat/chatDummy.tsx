import { SetStateAction, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import FriendsChat from "./component/FriendsChat";
import { Account } from "../../ui/types";
import UserInChannel from "./component/UserInChannel";
import Channels from "./component/Channels";
import DirectMessage from "./component/DirectMessage"
import CreateChannel from "./component/CreateChannel";
import ChatBoard from "./component/ChatBoard";
import Message from "./interface/messageDto";
import { useAccount } from "../../ui/organisms/useAccount";
import InvitGameMsg from "./component/InvitGameMsg";
import { useNavigate } from "react-router-dom";
import "./chat.css"
import {createPortal} from "react-dom";
import {SimpleRegistrationForm} from "./component/stylePopUP";
import Channel from "./interface/channelDto";
import channels from "./component/Channels";

const Chat = () => {
    const [userInChannel, setUserInChannel] = useState<Account[]>([]);
    const [data, setData] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentChannel, setCurrentChannel] = useState("");
    const [pass, setPass] = useState(""); // a voir chmager le nom
    const [DM_Chann, setDM_Chann] = useState(true); //changer les nom
    const [channelStatus, setChannelStatus] = useState(false);
    const [Owner, setOwner] = useState("0");
    const socket = useSocket();
    const [isCorrect, setIsCorrect] = useState(false);
    const { account } = useAccount();
    const navigate = useNavigate();

    useEffect(() => {
        if (socket) {
            socket.emit("getAllChannels")
            socket.emit("refreshDMChannel")
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on("message", (data, name, id) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { message: data, username: name, uId: id }
                ]);
            });
        }

        return () => {
            if (socket) {
                socket.off("message");
            }
        };

    }, [socket]);

    useEffect(() => {
        if (!currentChannel) {
            setCurrentChannel("create a channel!")
        }
        if (socket) {
            socket.on("getChannelMeOne", (Id, chanName, status, owner) => {
                setDM_Chann(true);
                setOwner(owner);
                setChannelStatus(status);
            //  if (status) {
                socket.emit("message", " ", chanName, '1');
            });
            socket.on("getDMChannelMe", (name, status, user) => {
                setCurrentChannel(name)
                setDM_Chann(false)
                setUser(user);
            });
            socket.on("setUserInChannel", (user) => {
                setUser(user);
            })
            socket.on("checkPass", (name, datta, curChan) => {
                setteurPass(datta);

                //setPass(datta);
                if (datta === "ok") {
                    setIsCorrect(true)
                    //  socket.emit("message", "", name, '1');
                    socket.emit("getChannelMeOne", name, curChan);
                    setPass("ok")
                    setData("");
                //  socket.emit("message", "", name, '1');
                }
                else {
                    setUserInChannel([])
                    setCurrentChannel("create a channel!")
                }
                setMessages([]);
            });
            socket.on("trans", (data) => {
                socket.emit("refreshDMChannel")
            });
            socket.on("createDMChannel", () => {
                setMessages([]);
            });
            socket.on("deleteChannelForAllUser", (data) => {
                setCurrentChannel("create a channel!");
                setMessages([]);
            });
            socket.on("messages", (data) => {
                setMessages(data)
                console.log(socket)
            });
            socket.on("banUser", (channelName) => {
                if (socket) {
                    socket.emit("getChannelMeOne", channelName, channelName)
                    setMessages([]);
                }
            });
            socket.on("game", (data) => {
                if (typeof data === 'object') {
                    navigate("/pong")
                }
            });
        }
        return () => {
            if (socket) {
                socket.off("getChannelMeOne");
                //  socket.off("deleteChannel");
                socket.off("messages");
                socket.off("deleteChannelForAllUser");
                socket.off("checkPass");
                socket.off("banUser");
                socket.off("trans");
                socket.off("getDMChannelMe");
                socket.off("setUserInChannel");
                socket.off("createDMChannel");
                socket.off("game");
            }
        };
    }, [socket, data, currentChannel]);

    const setUser = (user: Account[]) => {
        const withoutMe = user.filter(user => user.id !== account.id)
        setUserInChannel(withoutMe);
    }
    // && channelSet !== currentChannel
    function takeChan(channelSet: string, chanStatue: string, password?: string) {
        console.log("data: ", data)
        setCurrentChannel(channelSet)
        console.log("chann = ", channelSet, "current channel: ", currentChannel)
        if (chanStatue !== "Public") {
            setCurrentChannel(channelSet);
            // const password = prompt("what is the PassWord?");    //todo enlever le prompt;
            // console.log("password: ", password);
            if (socket)
                socket.emit("checkPass", channelSet, password, currentChannel);
        }
        if (chanStatue === "Public") {  
            setCurrentChannel(channelSet);
            if (socket) {
                socket.emit("getChannelMeOne", channelSet, currentChannel);
                setPass("ok");
                setData("");
            }
        }
    }

    function takeDMChan(channelSet: string) {
        setCurrentChannel(channelSet)
        if (socket) {
            socket.emit("getDMChannelMe", channelSet, currentChannel);
            setPass("ok")
            setData("");
        }
    }

    function setteurPass(passe: SetStateAction<string>) {
        setPass(passe);
    }

    return (
        <div className="w-full flex justify-center items-center h-[900px] p-10"> {/*div prinsipale*/}
            <div className="hidden md:flex h-full w-2/5 xl:w-[30%] flex flex-col justify-between p-5 bg-black/80 rounded-l-md">
                <CreateChannel currentChannel={currentChannel} />
                <div className="w-full h-[45%] bg-black/60 shadow-md flex-start shadow-white rounded-md ">
                    <Channels takeChan={takeChan} currentChannel={currentChannel} setMessages={setMessages} userInChannel={userInChannel} channelStatus={channelStatus} Owner={Owner} setChannelStatus={setChannelStatus} setOwner={setOwner} />
                    {/* <Channels takeChan={takeChan} currentChannel={currentChannel} setMessages={setMessages} userInChannel={userInChannel} channelStatus={channelStatus} Owner={Owner} setChannelStatus={setChannelStatus} setOwner={setOwner} /> */}
                </div>
                <div className="w-full h-[40%] bg-black/60 shadow-md flex-start shadow-white rounded-md">
                    <DirectMessage takeChan={takeDMChan} currentChannel={currentChannel} />
                </div>
            </div>
            <ChatBoard currentChannel={currentChannel} messages={messages} pass={pass} DM_Chann={DM_Chann} data={data} setData={setData} />
            <div className="hidden xl:flex h-full w-2/5 xl:w-[30%] flex flex-col justify-between p-5 bg-black/80 rounded-r-md">
                <InvitGameMsg />
                <div className="w-full h-[45%] bg-black/60 shadow-md flex-start shadow-white rounded-md">
                    <UserInChannel userInChannel={userInChannel} />
                </div>
                <div className="w-full h-[40%] bg-black/60 shadow-md flex-start shadow-white rounded-md">
                    <FriendsChat currentChannel={currentChannel} />
                </div>
            </div>
        </div>
    );

};
export default Chat;

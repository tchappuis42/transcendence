
import React from "react";
import { useAccount } from "../../../ui/organisms/useAccount";
import { handleMouseEnter, handleMouseLeave } from "../../Friend/interface/Tools";

interface Message {
    message: string;
    username: string;
    uId: number
}

interface messageProps {

    msg: Message
    index: number
}

const MessageChatCard = ({ msg, index }: messageProps) => {
    const { account } = useAccount();

    return (
        msg.uId === account.id ? (
            <div className=" w-full flex justify-end mt-2">
                <div className="flex p-3 h-full justify-end max-w-2/3 rounded-md bg-white/70 shadow-md shadow-black wordBreak"
                    key={index}
                    style={{ maxWidth: "80%" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {msg.message.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        ) : (
            <div className=" w-full flex justify-start mt-2">
                <div className="flex p-3 h-full mw-2/3 rounded-md bg-black/70 shadow-md shadow-white wordBreak flex-col"
                    key={index}
                    style={{ maxWidth: "80%" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <button className="flex" >
                        <h1 className="text-white opacity-50 ml-1">{msg.username}</h1>
                    </button>
                    <h1 className="text-white ml-5">{msg.message}</h1>
                </div>
            </div>
        )
    )

}

export default MessageChatCard
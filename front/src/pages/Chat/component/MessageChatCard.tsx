
import React from "react";
import { useAccount } from "../../../ui/organisms/useAccount";
import { handleMouseEnter, handleMouseLeave } from "../../Friend/interface/Tools";
import Message from "../interface/messageDto";

interface messageProps {

	msg: Message
	index: number
}

const MessageChatCard = ({ msg, index }: messageProps) => {
	const { account } = useAccount();
	return (
		msg.uId === account.id ? (
			<div className="w-full flex justify-end mt-2 px-4">
				<div className="bg-orange-200 flex p-3 h-full justify-end max-w-2/3 rounded-md shadow-md"
					key={index}
					style={{ maxWidth: "80%", wordBreak: "break-word" }}
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
			<div className="w-full flex justify-start mt-2 px-4">
				<div className="flex p-3 h-full mw-2/3 rounded-md bg-black/70 shadow-md  flex-col gap-1"
					key={index}
					style={{ maxWidth: "80%", wordBreak: "break-word" }}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<button className="flex" >
						<h1 className="text-white text-[12px] opacity-50 text-left">{msg.username}</h1>
					</button>
					<h1 className="text-white text-left">{msg.message}</h1>
				</div>
			</div>
		)
	)

}

export default MessageChatCard
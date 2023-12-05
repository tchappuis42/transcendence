import Friends from "./component/Friends";
import FriendsToAdd from "./component/AddFriend";
import Friendss from "./testfriendss";
import PendingFriend from "./component/PendingFriend";
import Status from "./teststatus";

const Testfriends = () => {
	return (
		<div className="w-full h-[800px] p-20">
			<div className="grid gap-2 grid-cols-2 grid-rows-2 w-full h-full">
				<div className="h-full w-full p-2.5 bg-black/50 rounded-xl">
					<Friends />
				</div>
				<div className="h-full w-full p-2.5 bg-black/50 rounded-xl">
					<FriendsToAdd />
				</div>
				<div className="h-full w-full p-2.5 bg-black/50 rounded-xl">
					<PendingFriend />
				</div>
				<div className="h-full w-full p-2.5 bg-black/50 rounded-xl">
					{/* <Friendss /> */}
				</div>
				<Status></Status>
			</div>
		</div>
	)
}
export default Testfriends;
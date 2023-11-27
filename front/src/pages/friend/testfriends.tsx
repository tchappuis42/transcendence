import Friends from "./friends";
import FriendsToAdd from "./friendsToAdd";
import Friendss from "./friendss";
import PendingFriend from "./pendingFriend";
import Status from "./status";

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
					<Friendss />
				</div>
				<Status></Status>
			</div>
		</div>
	)
}
export default Testfriends;
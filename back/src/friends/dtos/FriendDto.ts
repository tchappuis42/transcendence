import { User } from "src/user/user.entity"

export class FriendDto {
	friend_user: User
	friend_status: number
}
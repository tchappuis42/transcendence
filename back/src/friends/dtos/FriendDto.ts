import { IsNotEmpty } from "class-validator"
import { User } from "src/user/user.entity"

export class FriendDto {
	@IsNotEmpty()
	friend_user: User

	@IsNotEmpty()
	friend_status: number
}
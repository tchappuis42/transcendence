import { IsNotEmpty, IsNumber } from "class-validator"
import { User } from "src/user/user.entity"

export class FriendDto {
	@IsNotEmpty()
	friend_user: User

	@IsNotEmpty()
	@IsNumber()
	friend_status: number
}
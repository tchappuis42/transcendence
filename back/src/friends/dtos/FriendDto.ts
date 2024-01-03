import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator"
import { UserDto } from "src/user/dtos/UserDto"
import { User } from "src/user/user.entity"

export class FriendDto {
	@IsNotEmpty()
	friend_user: User

	@IsNotEmpty()
	@IsNumber()
	friend_status: number
}
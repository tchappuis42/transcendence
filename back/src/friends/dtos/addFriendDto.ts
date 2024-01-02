import { IsNotEmpty } from "class-validator"

export class addFriendDto {
	@IsNotEmpty()
	id: number
}
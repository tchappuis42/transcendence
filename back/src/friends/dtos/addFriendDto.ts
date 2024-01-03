import { IsNotEmpty, IsNumber } from "class-validator"

export class addFriendDto {
	@IsNotEmpty()
	@IsNumber()
	id: number
}
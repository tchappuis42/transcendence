import { IsNotEmpty } from "class-validator"

export class AcceptDto {
	@IsNotEmpty()
	id: number
	@IsNotEmpty()
	accept: boolean
}
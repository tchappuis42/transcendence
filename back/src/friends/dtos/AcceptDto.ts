import { IsNotEmpty, IsNumber, IsBoolean } from "class-validator"

export class AcceptDto {
	@IsNotEmpty()
	@IsNumber()
	id: number

	@IsNotEmpty()
	@IsBoolean()
	accept: boolean
}
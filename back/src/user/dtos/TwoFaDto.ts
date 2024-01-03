import { IsNotEmpty, IsNumber } from "class-validator";

export class TwoFaDto {
	@IsNotEmpty()
	code: string;

	@IsNotEmpty()
	validation: string;
}
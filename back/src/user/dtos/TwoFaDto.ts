import { IsNotEmpty } from "class-validator";

export class TwoFaDto {
	@IsNotEmpty()
	code: string;

	@IsNotEmpty()
	validation: number;
}
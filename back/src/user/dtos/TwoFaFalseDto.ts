import { IsNotEmpty } from "class-validator";

export class TwoFaFalseDto {
	@IsNotEmpty()
	value: boolean;

	secret: string;
}
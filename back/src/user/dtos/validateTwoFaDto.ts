import { IsNotEmpty } from "class-validator";

export class validateTwoFaDto {
	@IsNotEmpty()
	value: boolean;

	@IsNotEmpty()
	secret: string;
}

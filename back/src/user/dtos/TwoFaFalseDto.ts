import { IsBoolean, IsNotEmpty } from "class-validator";

export class TwoFaFalseDto {
	@IsNotEmpty()

	key: string;
}
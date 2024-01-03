import { IsBoolean, IsNotEmpty } from "class-validator";

export class validateTwoFaDto {
	@IsNotEmpty()
	@IsBoolean()
	value: boolean;

	@IsNotEmpty()
	secret: string;
}

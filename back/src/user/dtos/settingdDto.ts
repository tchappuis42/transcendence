import { IsNotEmpty, IsBoolean } from "class-validator";

export class settingsDto {
	@IsNotEmpty()
	value: string;

	@IsNotEmpty()
	@IsBoolean()
	type: boolean;
}
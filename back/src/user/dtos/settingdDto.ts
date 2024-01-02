import { IsNotEmpty } from "class-validator";

export class settingsDto {
	@IsNotEmpty()
	value: string;

	@IsNotEmpty()
	type: boolean;
}
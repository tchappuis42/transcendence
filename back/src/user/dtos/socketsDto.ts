import { IsNotEmpty, IsNumber } from "class-validator";

export class sockets {
	@IsNotEmpty()
	id: string;

	@IsNotEmpty()
	@IsNumber()
	userid: number;
}
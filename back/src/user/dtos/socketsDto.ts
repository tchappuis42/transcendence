import { IsNotEmpty } from "class-validator";

export class sockets {
	@IsNotEmpty()
	id: string;

	@IsNotEmpty()
	userid: number;
}
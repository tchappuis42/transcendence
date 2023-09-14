import { UserDto } from "src/user/dtos/UserDto";

export class CreatGameDTO {
	roomName: string;
	player1: UserDto;
	player2: UserDto;
}
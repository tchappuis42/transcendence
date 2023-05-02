import {IsString} from "class-validator"
export class AvatarDto {

	@IsString()
	avatar : string
}
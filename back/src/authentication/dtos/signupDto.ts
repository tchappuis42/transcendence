import { IsString, IsEmail, IsNotEmpty, Length } from "class-validator"
export class SignupDto {

	@IsNotEmpty()
	@IsString()
	@Length(3, 15)
	identifiant: string

	@IsString()
	@IsNotEmpty()
	@Length(8, 20)
	password: string

	twoFa: boolean
}
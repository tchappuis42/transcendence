export class UserDto {
	id: number
	username: string
	email: string
	avatar: string
	password: string
	twoFa: boolean
	twoFaSecret: string
	connected: boolean
}
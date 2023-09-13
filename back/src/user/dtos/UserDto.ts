export class UserDto {
	id: number
	username: string
	email: string
	avatar: string
	twoFa: boolean
	twoFaSecret: string
	connected: boolean
}
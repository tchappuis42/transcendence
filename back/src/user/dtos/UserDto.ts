export class UserDto {
	id: number
	username: string
	avatar: string
	twoFa: boolean
	twoFaSecret: string
	connected: boolean
}
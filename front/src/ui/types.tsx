export type Account = {
	id: number;
	username: string;
	email: string;
	avatar: string;
	twoFa: boolean;
	twoFaSecret: string;
};
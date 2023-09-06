interface FormProps {
	data: {
		email: string;
		password: string;
		username: string;
		twoFa: boolean;
	};
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	settingPage: (newPage: string) => void;
	showPassword: boolean;
	togglePassword: () => void;
	toggletfa?: () => void;
}

export default FormProps;
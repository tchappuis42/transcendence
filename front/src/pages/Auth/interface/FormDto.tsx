interface FormProps {
	data: {
		password: string;
		identifiant: string;
		twoFa: boolean;
	};
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	settingPage: (newPage: string) => void;
	showPassword: boolean;
	togglePassword: () => void;
	toggletfa?: () => void;
}

export default FormProps;
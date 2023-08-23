import { useCallback } from "react";
import { Account } from "../types";
import { useAccountStore } from "./store";
import axios from "axios";

export enum AuthStatus {
	Unknown = 0,
	Guest = 1,
	Authenticated = 2,
}

export function useAuth() {
	const { account, setAccount } = useAccountStore();
	let status = AuthStatus.Unknown
	switch (account) {
		case null:
			status = AuthStatus.Guest;
			break;
		case undefined:
			status = AuthStatus.Unknown;
			break;
		default:
			status = AuthStatus.Authenticated;
			break;
	}

	const authenticate = useCallback(async () => {
		try {
			const response = await axios.get<Account>("http://localhost:4000/user/me", { withCredentials: true });
			setAccount(response.data);
		} catch (error) {
			setAccount(null);
		}
	}, []);

	const login = useCallback(async (email: string, password: string) => {
		try {
			await axios.post("http://localhost:4000/authentication/login", { email, password }, { withCredentials: true });
			authenticate()
		} catch (error) {
			setAccount(null);
		}
	}, []);

	const logout = useCallback(async () => {
		await axios.get("http://localhost:4000/authentication/logout", { withCredentials: true });
		setAccount(null);
	}, []);

	return {
		account,
		status,
		authenticate,
		login,
		logout,
	};
}
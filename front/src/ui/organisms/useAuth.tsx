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
			const response = await axios.get<Account>("/api/user/me", { withCredentials: true });
			setAccount(response.data);
		} catch (error) {
			setAccount(null);
		}
	}, []);

	const login = useCallback(async (username: string, password: string) => {
		try {
			const response = await axios.post("/api/authentication/login", { username, password }, { withCredentials: true });

			if (response.data.message) {
				authenticate();
				return false;
			} else {
				return true;
			}
		} catch (error) {
			return error;
			setAccount(null);
			throw error;
		}
	}, []);

	const logout = useCallback(async () => {
		await axios.get("/api/authentication/logout", { withCredentials: true });
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
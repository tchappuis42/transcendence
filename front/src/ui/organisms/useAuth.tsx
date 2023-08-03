import { useCallback } from "react";
import { Account } from "../types";
import { useAccountStore } from "./store";
import axios from "axios";

export enum AuthStatus {
	Guest = 0,
	Authenticated = 1,
}

export function useAuth() {
	const { account, setAccount } = useAccountStore();
	let status = AuthStatus.Guest
	if (account)
		status = AuthStatus.Authenticated;

	const authenticate = useCallback(async () => {
		try {
			const response = await axios.get<Account>("http://localhost:4000/user/me", { withCredentials: true });
			setAccount(response.data);
		} catch (error) {
			setAccount(null);
		}
	}, []);

	return {
		account,
		status,
		authenticate,
	};
}
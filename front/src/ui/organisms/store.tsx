import { create } from "zustand";
import { combine } from "zustand/middleware"
import { Account } from "../types";

export const useAccountStore = create(
	combine({
		account: null as null | Account,
	},
		(set) => ({
			setAccount: (account: Account | null) => set({ account }),
		})
	)
);
import React, { useEffect } from "react";
import "../slanderousMenu.css"
import { useState } from "react";
import { ClickOutside } from "../../tools/clickoutside";
import loupe from "../../../image/noun-loupe.svg";
import axios from "axios";
import UserCard from "./UserCard";

type IsActivComponent = {
	inputRef: React.RefObject<HTMLInputElement>;
};

interface User {
	id: number;
	username: string;
	avatar: string;
}

export const DropDownMenuList = ({ inputRef }: IsActivComponent) => {
	const [search, setSearch]: [string, (search: string) => void] = useState("");
	const [open, setOpen] = useState(false);
	const ref = ClickOutside({ setOpen });
	const [fetchUser, setFetchUser] = useState<boolean>(false)
	const [input, setInput] = useState<string>("");
	const [users, setUsers] = useState<User[]>()

	useEffect(() => {
		if (fetchUser && input.length > 0) {
			const fetchData = async () => {
				try {
					const response = await axios.get(`/api/user/getUsersByName/${input}`, { withCredentials: true });
					setUsers(response.data);
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			};
			fetchData();
		}
	}, [fetchUser, input]);

	const handleOpen = (): void => {
		setOpen(true);
		setFetchUser(true);
	}

	const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setSearch(event.target.value);
		setInput(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent): void => {
		if (event.key === "Enter")
			setSearch("");
	};

	return (
		<div ref={ref}>
			<span className="static" onClick={handleOpen}>
				<img className="h-[20px] relative top-0 right-0" alt="search" src={loupe} />
				<div>

					{open ? (
						<div style={{ background: "blue" }}>
							<input
								className={`absolute top-1/4 right-20 black-border-fine rounded pl-2`}
								ref={inputRef}
								type="text"
								value={search}
								onChange={handleSearchInput}
								onKeyDown={handleKeyDown}
							>
							</input>
							{users?.length && input.length ? (
								<div className={`absolute top-1/1000 h-60 right-20 w-60 mt-10 overflow-y-auto`}>
									{users?.map((user: User) => (
										<UserCard key={user.id} user={user} setOpen={setInput}></UserCard>
									))}
								</div>
							) :
								null
							}
						</div>
					) : null}
					<div style={{ background: "green" }}>

					</div>
				</div>
			</span>
		</div>
	);
}
import * as React from "react";
import "../slanderousMenu.css"
import { useAuth } from "../../../../ui/organisms/useAuth";
import { SyntheticEvent, useState } from "react";
import { ClickOutside } from "../../tools/clickoutside"
import Navigation from "../../../../ui/organisms/Navigation";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../../../ui/organisms/useAccount";

interface Props {
	height: number;
	width: number;
}
export const DropDownMenuListPictures = ({ height, width }: Props) => {
	const [open, setOpen] = useState(false);
	const ref = ClickOutside({ setOpen });
	const navigate = useNavigate();
	const { account } = useAccount();

	// let menuRef = useRef<HTMLInputElement>(null);
	const handleOpen = (): void => {
		setOpen(!open);
	}

	const { logout } = useAuth();
	const LogoutSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		logout();
	}

	const handleNav = (toNav: string, id: number) => {
		navigate(toNav, {
			state: {
				id: id
			}
		})
	}

	return (
		<div className="profil-pictures-with-slanderous-menu black-border-fine rounded" ref={ref}
			style={{ width: `${height}px`, height: `${width}px` }}>
			<span className="test" onClick={handleOpen}>
				<img alt="userPhoto" style={{ width: `${height}px`, height: `${width}px` }}
					src={account.avatar}
					className="object-cover " />
			</span>
			{open && (
				<div className={`menu-slanderous black-border-fine`}>
					<div role="menu" aria-orientation="vertical" aria-labelledby="options-menu" className="p-3">
						<li className="cursor-pointer flex border-b border-gray-300 h-10 items-center" onClick={() => handleNav("/profil", account.id)}>
								Profil
						</li>
						<li className="cursor-pointer flex border-b border-gray-300 h-10 items-center" onClick={() => handleNav("/settings", account.id)}>
								Settings
						</li>
						<li className="cursor-pointer flex border-b border-gray-300 h-10 items-center" onClick={LogoutSubmit}>
							Logout
						</li>
					</div>
				</div>
			)}
		</div>
	);
}
import * as React from "react";
import "../slanderousMenu.css"
import { useAuth } from "../../../../ui/organisms/useAuth";
import { SyntheticEvent, useState } from "react";
import { ClickOutside } from "../../tools/clickoutside"
import Navigation from "../../../../ui/organisms/Navigation";
import {useNavigate} from "react-router-dom";
import {useAccount} from "../../../../ui/organisms/useAccount";

const navigationOptionsProfil = [
	{ label: 'profil', url: '/profil' },
];

interface Props {
	height: number;
	width: number;
}
export const DropDownMenuListPictures = ({ height, width }: Props) => {
	const [open, setOpen] = useState(false);
	const ref = ClickOutside({ setOpen });
	const { account } = useAccount();
	// let menuRef = useRef<HTMLInputElement>(null);
	const handleOpen = (): void => {
		setOpen(!open);
	}

	const navigate = useNavigate();
	const { logout } = useAuth();
	const LogoutSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		logout();
	}

	const handleNav = (id : number) => {
        navigate("/profil", {
            state : {
                id : id
            }
        })
    }

	const id: string = account.id.toString();
	return (
		<div className="profil-pictures-with-slanderous-menu black-border-fine rounded" ref={ref}
			style={{ width: `${height}px`, height: `${width}px` }}>
			<span className="test" onClick={handleOpen}>
				<img alt="userPhoto" style={{ width: `${height}px`, height: `${width}px` }}
					src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg"
					className="object-cover rounded" />
			</span>
			{open && (
				<div className={`menu-slanderous black-border-fine`}>
					<div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
						<li className="menu-slanderous-list">
							<button onClick={() => handleNav(account.id)}>
								profil
								{/*<Navigation options={navigationOptionsProfil} />*/}
							</button>
						</li>
						<li className="menu-slanderous-list">
							<button onClick={LogoutSubmit}>logout</button>
						</li>
					</div>
				</div>
			)}
		</div>
	);
}
import * as React from "react";
import "../slanderousMenu.css"
import {useAuth} from "../../../../../ui/organisms/useAuth";
import {SyntheticEvent, useState} from "react";
import {ClickOutside} from "../../tools/clickoutside"

interface Props {
	height: number;
	width: number;
}
export const SlanderousMenuListPictures = ({height, width}: Props) => {
	const [open, setOpen] = useState(false);
	const ref = ClickOutside({ setOpen });

	// let menuRef = useRef<HTMLInputElement>(null);
	const handleOpen = (): void => {
		setOpen(!open);
	}

	const { logout } = useAuth();
	const LogoutSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		console.log("test");
		logout();
	}

	return (
		<div className="profil-pictures-with-slanderous-menu black-border-fine rounded" ref={ref}
			 style={{width: `${height}px`, height: `${width}px`}}>
			<span className="test" onClick={handleOpen}>
				<img alt="userPhoto" style={{width: `${height}px`, height: `${width}px`}}
					 src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg"
					 className="object-cover rounded"/>
			</span>
			{open && (
			<div className={`menu-slanderous black-border-fine`}>
				<div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
					<li className="menu-slanderous-list">
						<button>profile</button>
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
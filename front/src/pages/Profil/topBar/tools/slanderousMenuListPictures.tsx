import * as React from "react";
import "./slanderousMenu.css"
import {useAuth} from "../../../../ui/organisms/useAuth";
import {SyntheticEvent, useState} from "react";

interface Props {
	height: number;
	width: number;
}
export const SlanderousMenuListPictures = ({height, width}: Props) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(!open);
	};
	const { logout } = useAuth();
	const LogoutSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		console.log("test");
		logout();
	}
	return (
		<div className="profil-pictures-with-slanderous-menu black-border-fine rounded"
			 style={{width: `${height}px`, height: `${width}px`}}>
				<span onClick={handleOpen} className="test">
					<img alt="userPhoto" src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg"
						 style={{width: `${height}px`, height: `${width}px`}}
						 className="object-cover rounded"/>
				</span>
			{open ? (
				<div className="menu-slanderous black-border-fine">
					<div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
						<li className="menu-slanderous-list">
							<button>profile</button>
						</li>
						<li className="menu-slanderous-list">
							<button onClick={LogoutSubmit}>logout</button>
						</li>
					</div>
				</div>
			) : null}
		</div>
	);
}
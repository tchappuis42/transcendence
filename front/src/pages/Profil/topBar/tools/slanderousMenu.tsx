import * as React from "react"
import "./slanderousMenu.css"
import userPicture from "../../../image/kdi-noce.jpg";
import {useAuth} from "../../../../ui/organisms/useAuth";
import {SyntheticEvent, useEffect, useRef, useState} from "react";

export const SlanderousMenu = () => {
	const myRef = useRef<HTMLDivElement | null>(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0)
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

	useEffect(() => {
		if (myRef.current) {
			const h: number = myRef.current.clientHeight;
			setHeight(h)
			setWidth(h);
		}
	}, []);
	return (
		<>
			<div className="profil-pictures-with-slanderous-menu black-border-fine"
				 style={{width: `${height}px`, height: `${width}px`}}>
				<span onClick={handleOpen} className="test">
					<div className="red-border w-16 h-16">hello</div>
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
		</>
	);
}
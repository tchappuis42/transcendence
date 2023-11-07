import * as React from "react"
import "./topBar.css"
import search from "../../image/noun-loupe.svg";
import notification from '../../image/noun-bell.svg';
import {SlanderousMenu} from "./tools/slanderousMenu"
import {SyntheticEvent, useEffect, useRef, useState} from "react";
import {useAuth} from "../../../ui/organisms/useAuth";

export const TopBar = () => {
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
	// @ts-ignore
	return (
		<div ref={myRef} className="top-bar">
			<div className="px-4 font-bold rounded">Transcendance</div>
			<div className="py-2">middle</div>
			<div className="profile-bar-menu">
				<img alt="notification" src={notification} className="h-[20px]"/>
				<img alt="search" src={search} className="h-[20px]"/>
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
			</div>
		</div>
	);
}
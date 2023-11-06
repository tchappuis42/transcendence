import * as React from "react"
import search from "../../image/noun-loupe.svg";
import userPicture from "../../image/kdi-noce.jpg";
import notification from '../../image/noun-bell.svg';
import {useAuth} from "../../../ui/organisms/useAuth";
import {useAccount} from "../../../ui/organisms/useAccount";
import {SyntheticEvent, useEffect, useRef, useState} from "react";

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
	// @ts-ignor	e
	return (
		<div ref={myRef} className="bg-gray-100 w-full h-16 sticky top-0 rounded">
			<div className="flex items-center justify-between">
				<div className="px-4 font-bold rounded">Transcendance</div>
				<div className="py-2">middle</div>
				<div className="flex items-center justify-between w-[150px]">
					<div>
						<img alt="notification" src={notification} className="h-[20px]"/>
					</div>
					<div>
						<img alt="search" src={search} className="h-[20px]"/>
					</div>
					<div style={{width: `${height}px`, height: `${width}px`}}
						 className="rounded black-border-fine overflow-hidden">
						<span onClick={handleOpen} className="test">
							<img alt="userPhoto" src={userPicture}
								 style={{width: `${height}px`, height: `${width}px`}}
								 className="object-cover rounded"/>
						</span>
						{open ? (
							<ul className="menu black-border-fine">
								<li className="menu-item">
									<button>profile</button>
								</li>
								<li className="menu-item">
									<button onClick={LogoutSubmit}>logout</button>
								</li>
							</ul>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
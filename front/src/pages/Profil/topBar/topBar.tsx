import * as React from "react"
import "./topBar.css"
import search from "../../image/noun-loupe.svg";
import notification from '../../image/noun-bell.svg';
import {SlanderousMenu} from "./tools/slanderousMenu"
import {useRef} from "react";

export const TopBar = () => {
	const myRef = useRef<HTMLDivElement | null>(null);
	// @ts-ignore
	return (
		<div ref={myRef} className="top-bar">
			<div className="px-4 font-bold rounded">Transcendance</div>
			<div className="py-2">middle</div>
			<div className="profile-bar-menu">
				<img alt="notification" src={notification} className="h-[20px]"/>
				<img alt="search" src={search} className="h-[20px]"/>
				<SlanderousMenu/>
			</div>
		</div>
	);
}
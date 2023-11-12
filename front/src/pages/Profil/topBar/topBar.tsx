import * as React from "react"
import "./topBar.css"
import "./components/slanderousMenu.css"
import {SlanderousMenu} from "./components/slanderousMenu"
import {useRef} from "react";
import Navigation from "../../../ui/organisms/Navigation";

const navigationHome = [
	{ label: 'Transcendance', url: '/' },
];

const navigationOptionsChat = [
	{ label: 'chat', url: '/chat' },
];

const navigationOptionsPong = [
	{ label: 'pong', url: '/pong' },
];

export const TopBar = () => {
	const myRef = useRef<HTMLDivElement | null>(null);
	// @ts-ignore
	return (
		<div className="padding-top-bar">
			<div ref={myRef} className="top-bar">
				<div className="px-4 font-bold rounded">
					<Navigation options={navigationHome} />
				</div>
				<Navigation options={navigationOptionsChat} />
				<Navigation options={navigationOptionsPong} />
				<SlanderousMenu myRef={myRef}/>
			</div>
		</div>
	);
}

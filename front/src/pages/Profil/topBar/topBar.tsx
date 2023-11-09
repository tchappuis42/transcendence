import * as React from "react"
import "./topBar.css"
import "./components/slanderousMenu.css"
import {SlanderousMenu} from "./components/slanderousMenu"
import {useRef} from "react";

export const TopBar = () => {
	const myRef = useRef<HTMLDivElement | null>(null);
	// @ts-ignore
	return (
		<div ref={myRef} className="top-bar">
			<div className="px-4 font-bold rounded">Transcendance</div>
			<div className="py-2">middle</div>
			<SlanderousMenu myRef={myRef}/>
		</div>
	);
}
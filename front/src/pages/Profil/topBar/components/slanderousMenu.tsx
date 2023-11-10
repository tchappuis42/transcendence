import * as React from "react"
import "./slanderousMenu.css"
import {useEffect, useState, useRef} from "react";
import {JustTheIcon} from "./searchGlass/justTheIcon"
import {ComponentWithInput} from "./searchGlass/componentWithInput";
import {SlanderousMenuListPictures} from "./profilPictures/slanderousMenuListPictures";
import {BellNotificationComponent} from "./bell/bellComponent";

type SlanderousMenuProps = {
	myRef: React.RefObject<HTMLDivElement>;
};

export const SlanderousMenu = ({myRef}: SlanderousMenuProps) => {

	const inputRef = useRef<HTMLInputElement>(null);

	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [isActive, setIsActive] = useState(false);

	useEffect((): void => {
		if (myRef.current) {
			const h: number = myRef.current.clientHeight;
			setHeight(h)
			setWidth(h);
		}
	}, [myRef]);

	// const HandleOpen = (): void => {
	// 	setIsActive(true);
	// }

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (inputRef.current instanceof Node && !inputRef.current.contains(e.target as Node)) {
				setIsActive(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		}
	}, []);

	return (
		<div className="profile-bar-menu">
			<BellNotificationComponent setIsActive={setIsActive}/>
			<ComponentWithInput setIsActive={setIsActive} inputRef={inputRef}/>
			<SlanderousMenuListPictures height={height} width={width}/>
		</div>
	);
}
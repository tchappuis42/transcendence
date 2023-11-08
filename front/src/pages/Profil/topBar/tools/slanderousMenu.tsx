import * as React from "react"
import "./slanderousMenu.css"
import {useEffect, useState, useRef} from "react";
import {JustTheIcon} from "./justTheIcon"
import {ComponentWithInput} from "./componentWithInput";
import {SlanderousMenuListPictures} from "./slanderousMenuListPictures";
import notification from "../../../image/noun-bell.svg";

type SlanderousMenuProps = {
	myRef: React.RefObject<HTMLDivElement>;
};

export const SlanderousMenu = ({myRef}: SlanderousMenuProps) => {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [isActive, setIsActive] = useState(false);

	useEffect((): void => {
		if (myRef.current) {
			const h: number = myRef.current.clientHeight;
			setHeight(h)
			setWidth(h);
		}
	}, []);

	const inputRef = useRef<HTMLInputElement>(null);

	const HandleOpen = (): void => {
		console.log("handleOpen is called\n")
		setIsActive(true);
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}

	return (
		<div className="profile-bar-menu">
			<img alt="notification" src={notification} className="h-[20px]"/>
			{isActive?
				<ComponentWithInput setIsActive={setIsActive} inputRef={inputRef}/> :
				<JustTheIcon onClick={HandleOpen}/>
			}
			<SlanderousMenuListPictures height={height} width={width}/>
		</div>
	);
}
import * as React from "react"
import "../slanderousMenu.css"
import search from "../../../../image/noun-loupe.svg";

type JustTheIconProps = {
	onClick: () => void;
};

export const JustTheIcon = ({onClick}: JustTheIconProps) => {
	return (
		<div onClick={onClick}>
			<img alt="search" src={search} className="h-[20px]"/>
		</div>
	);
}
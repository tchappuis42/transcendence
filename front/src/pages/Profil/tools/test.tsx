import * as React from "react"
import Wallpaper from "../image/wallpaper.jpg";
import "../profil_page/styleProfilPage/mainCSS.css"
import "../profil_page/styleProfilPage/toolsCss.css"

interface Props {
	className?: string;
}
export const Test = ({className = ""}: Props ) => {
	return (
		<div className={`test red-border ${className}`}>
			<div className="test-component blue-border">c1 {className}</div>
			<div className="test-component blue-border">c2</div>
			<div className="test-component blue-border">c3</div>
			<div className="test-component blue-border h-[300]">c4 {className}</div>
			<div className="test-component blue-border min-h-fit">c5</div>
			<div className="test-component blue-border h-full">c6</div>
		</div>
	);
}
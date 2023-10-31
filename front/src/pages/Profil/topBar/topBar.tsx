import * as React from "react"
import notification from "../../image/noun-bell.svg";
import search from "../../image/noun-loupe.svg";
import userPicture from "../../image/kdi-noce.jpg";
import {useEffect, useRef, useState} from "react";

export const TopBar = () => {
	const myRef = useRef<HTMLDivElement | null>(null);;
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0)

	useEffect(() => {
		if (myRef.current) {
			const h: number = myRef.current.clientHeight;
			setHeight(h)
			setWidth(h);
		}
	}, []);
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
						<img alt="userPhoto" src={userPicture}
							 style={{width: `${height}px`, height: `${width}px`}}
							 className="object-cover rounded"/>
					</div>
				</div>
			</div>
		</div>
	);
}
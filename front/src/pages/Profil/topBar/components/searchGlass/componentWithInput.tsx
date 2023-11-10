import * as React from "react"
import "../slanderousMenu.css"
import {useState} from "react";
import {ClickOutside} from "../../tools/clickoutside";
import loupe from "../../../../image/noun-loupe.svg";


type IsActivComponent = {
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	inputRef: React.RefObject<HTMLInputElement>;
};

export const ComponentWithInput = ({setIsActive, inputRef}: IsActivComponent) => {
	const [search, setSearch]: [string, (search: string) => void] = useState("");
	const [open, setOpen] = useState(false);
	const ref = ClickOutside({ setOpen });

	const handleOpen = (): void => {
		setOpen(true);
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setSearch(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent): void => {
		if (event.key === "Enter")
			setSearch("");
	};

	const handleBlur = (event: React.FocusEvent): void => {
		if (!event.currentTarget.contains(event.relatedTarget as Node)) {
			setIsActive(false);
		}
	};

	return (
		<div className="glass-search-component" ref={ref}>
			<span className="static" onClick={handleOpen}>
				<img className="h-[20px] relative top-0 right-0" alt="search" src={loupe}/>
				{open ? (
				<input
					onBlur={handleBlur}
					className={`absolute top-1/4 right-20 black-border-fine rounded`}
					ref={inputRef}
					type="text"
					value={search}
					onChange={handleSearchChange}
					onKeyDown={handleKeyDown}
				>
				</input>
				): null}
			</span>
		</div>
	);
}
import * as React from "react"
import "../slanderousMenu.css"
import {useState} from "react";
import {ClickOutside} from "../../tools/clickoutside";
import loupe from "../../../image/noun-loupe.svg";

type IsActivComponent = {
	inputRef: React.RefObject<HTMLInputElement>;
};

export const DropDownMenuList = ({inputRef}: IsActivComponent) => {
	const [search, setSearch]: [string, (search: string) => void] = useState("");
	const [open, setOpen] = useState(false);
	const ref = ClickOutside({ setOpen });
	// handleOpen: permet d'ouvrir la barre de recherche.
	const handleOpen = (): void => {
		setOpen(true);
	}

	// handleSearchInput: permet de taper du text dans la barre de recherche.
	const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setSearch(event.target.value);
	};

	// handleKeyDown: permet de rechercher un nom en tapant enter sur le clavier
	const handleKeyDown = (event: React.KeyboardEvent): void => {
		if (event.key === "Enter")
			setSearch("");
	};

	return (
		<div className="glass-search-component" ref={ref}>
			<span className="static" onClick={handleOpen}>
				<img className="h-[20px] relative top-0 right-0" alt="search" src={loupe}/>
				{open ? (
				<input
					className={`absolute top-1/4 right-20 black-border-fine rounded`}
					ref={inputRef}
					type="text"
					value={search}
					onChange={handleSearchInput}
					onKeyDown={handleKeyDown}
				>
				</input>
				): null}
			</span>
		</div>
	);
}
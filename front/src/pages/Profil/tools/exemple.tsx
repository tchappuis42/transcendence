import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./style.css";

interface Props {
	property1: "variant-4" | "variant-3" | "default";
	className: any;
	bookContacts: string;
}

export const Users = ({
						  property1,
						  className,
						  bookContacts = "https://c.animaapp.com/4xhPfN2P/img/book-contacts-regular-icon-204610-1-2@2x.png",
					  }: Props): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, {
		property1: property1 || "default",
	});

	return (
		<div
			className={`users property-1-1-${state.property1} ${className}`}
			onMouseLeave={() => {
				dispatch("mouse_leave");
			}}
			onMouseEnter={() => {
				dispatch("mouse_enter");
			}}
		>
			{state.property1 === "default" && <img className="book-contacts" alt="Book contacts" src={bookContacts} />}

			{["variant-3", "variant-4"].includes(state.property1) && (
				<div className="book-contacts-wrapper">
					<img
						className="book-contacts-2"
						alt="Book contacts"
						src="https://c.animaapp.com/4xhPfN2P/img/book-contacts-regular-icon-204610-1-2@2x.png"
					/>
				</div>
			)}
		</div>
	);
};

function reducer(state: any, action: any) {
	switch (action) {
		case "mouse_enter":
			return {
				...state,
				property1: "variant-4",
			};

		case "mouse_leave":
			return {
				...state,
				property1: "default",
			};
	}

	return state;
}

Users.propTypes = {
	property1: PropTypes.oneOf(["variant-4", "variant-3", "default"]),
	bookContacts: PropTypes.string,
};
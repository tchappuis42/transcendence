import * as React from "react"
import { Flex } from "./flex"

interface Props {
	children?: React.ReactNode;
	bord?: React.CSSProperties["border"];
	alignI?: React.CSSProperties["alignItems"];
	borderRad?: React.CSSProperties["borderRadius"];
	backColor?: React.CSSProperties["backgroundColor"];
	className?: string;
	style?: React.CSSProperties;
}

export const Bubble = ({children, bord = "1px solid", borderRad = "5px", alignI = "center", backColor = "#ffffff", className, style, ...props}: Props) => {
	const endStyle: React.CSSProperties = {
		border: bord,
		alignItems: alignI,
		borderRadius: borderRad,
		backgroundColor: backColor,
		...style,
	};
	return (
		<div
			className={className}
			style={endStyle}
			{...props}
		>
			{children}
		</div>
	)
}

export type { Props as BubbleProps };
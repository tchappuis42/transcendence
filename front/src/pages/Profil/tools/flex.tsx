import React from "react";

//proprieters primaires pour l'initialisation de Flex, React.CSSPropreties permet l'utilisation des proprieters css.
interface Props {
	children?: React.ReactNode;
	direction?: React.CSSProperties["flexDirection"];
	align?: React.CSSProperties["alignItems"];
	justify?: React.CSSProperties["justifyContent"];
	gap?: React.CSSProperties["gap"];
	className?: string;
	style?: React.CSSProperties;
}

//fonction Flex: definit les props de l'interface avec des valeurs par default,
export const Flex = ({children, direction = "row", align = "strech", justify = "center", gap = 0, className, style, ...props} : Props) => {
	// endstyle est definit comme un objet, ajoute ou redefinit des proprieter necessaire pour le fonctionnement de la fonction, Attention
	// les proprieter de l'interface peuvent etre ecraser par les memes proprieter mise a double dans l'appel de la
	// fonction.
	const endStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: direction,
		alignItems: align,
		gap: gap,
		justifyContent: justify,
		...style,
	};
	// retourne une balise div qui comprend className (permet la personnalisation des appel de Flex), style (permet de
	// de configurer les proprieters ci-dessus ou qui ont ete rajouter (...props) selon son choix et children (pour utiliser des
	// composant avec Flex.
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
//exporter les noms utiliser dans flex.
export type { Props as FlexProps };
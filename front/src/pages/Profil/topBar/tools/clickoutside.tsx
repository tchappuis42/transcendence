import React, { useEffect, useRef } from 'react';

type ClickOutsideProps = {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/* ref.current instanceof Node:
	Vérifie si l'élément référencé par `ref.current` est une instance de `Node`.
	Elle vérifie si `ref.current` => objet (représente un nœud dans le DOM).
	Si `ref.current` n'est pas instance de `Node`, => pas un nœud dans le DOM,

	!ref.current.contains(e.target as Node):
	utilise la méthode `contains` => si l'élément cliqué (`e.target`) = descendant de l'élément référencé par `ref.current`.
	Si `e.target` est un descendant de `ref.current`, = le clic est effectué à l'intérieur de l'élément référencé par `ref.current`,
	`ref.current.contains(e.target)` renvoie `true` et `!ref.current.contains(e.target)` renvoie `false`,
	renvoie `false` et `if` n'est pas exécuté. Si `e.target` n'est pas un descendant de `ref.current`,
	= clic a été effectué en dehors de l'élément référencé par `ref.current`,
	donc `ref.current.contains(e.target)` renvoie `false` et `!ref.current.contains(e.target)` renvoie `true`
*/
export const ClickOutside = ({ setOpen }: ClickOutsideProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current instanceof Node && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		}
	}, [setOpen]);

	return ref;
};

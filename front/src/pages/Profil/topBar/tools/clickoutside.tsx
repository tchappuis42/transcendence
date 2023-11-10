import React, { useEffect, useRef } from 'react';

type ClickOutsideProps = {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

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

// useEffect(() => {
// 	let handler = (e: MouseEvent): void => {
// 		if (menuRef.current instanceof Node && !menuRef.current.contains(e.target as Node))
// 			setOpen(true);
// 	}
// 	document.addEventListener("mousedown", handler);
// 	return (): void => {
// 		document.removeEventListener("mousedown", handler);
// 	}
// }, [setOpen]);

// const [open, setOpen] = useState<boolean>(false);
// const menuRef = useRef<HTMLDivElement | null>(null);
//
// const handleOpen = (): void => {
// 	setOpen(!open);
// }
//
// useEffect(() => {
// 	const handler = (e: MouseEvent) => {
// 		if (menuRef.current instanceof Node && !menuRef.current.contains(e.target as Node)) {
// 			setOpen(true);
// 			console.log(menuRef.current);
// 		}
// 	};
// 	document.addEventListener("mousedown", handler);
// 	return () => {
// 		document.removeEventListener("mousedown", handler);
// 	}
// }, [setOpen]);


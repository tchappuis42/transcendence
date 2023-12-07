export const handleMouseEnter = (event: any) => {
	event.currentTarget.style.transform = "scale(1.05)";
};

export const handleMouseLeave = (event: any) => {
	event.currentTarget.style.transform = "scale(1)";
};
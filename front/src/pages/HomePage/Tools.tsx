
export const handleMouseEnter = (event: any) => {
    event.currentTarget.classList.add("zoomed");
};

export const handleMouseLeave = (event: any) => {
    event.currentTarget.classList.remove("zoomed");
};

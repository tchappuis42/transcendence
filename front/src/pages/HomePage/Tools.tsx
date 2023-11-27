import { useNavigate } from "react-router-dom";


// export const handleMouseEnter = (event: any) => {
//     event.currentTarget.style.transform = "scale(1.1)";
// };

// export const handleMouseLeave = (event: any) => {
//     event.currentTarget.style.transform = "scale(1)";
// };


export const handleMouseEnter = (event: any) => {
    event.currentTarget.classList.add("zoomed");
};

export const handleMouseLeave = (event: any) => {
    event.currentTarget.classList.remove("zoomed");
};

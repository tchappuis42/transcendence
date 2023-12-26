import { useNavigate } from "react-router-dom"
import React, { useState, useRef, useEffect } from 'react';

interface AvatarContainerProps {
    src : string | undefined
    id? : number | undefined
    navigation : boolean
    square ?: number
    id_div: string;
}

const AvatarContainer : React.FC<AvatarContainerProps> = ({src, id, navigation, square, id_div}) => {
    const navigate = useNavigate()
    const componentRef = useRef(null);

    const handleNav = (toNav: string, id: number | undefined) => {

        navigate(toNav, {
            state: {
                id: id
            }
        })
    }
    return (
        <div 
            className={`${square ? `h-full w-full` : "h-full"} ${navigation && "cursor-pointer"}`}
            onClick={navigation && id ? () => handleNav("profil", id) : undefined}
        >
            <img alt="image de profil" className="object-cover h-full w-full rounded"
                src={src} />
        </div>
    )
}

export default AvatarContainer
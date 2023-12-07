import { useNavigate } from "react-router-dom"


interface AvatarContainerProps {
    src : string | undefined
    id? : number | undefined
    navigation : boolean
    square ?: number 
}


const AvatarContainer : React.FC<AvatarContainerProps> = ({src, id, navigation, square}) => {
    const navigate = useNavigate()
    
    const handleNav = (toNav: string, id: number | undefined) => {

        navigate(toNav, {
            state: {
                id: id
            }
        })
    }

    return (
        <div 
            className={`${square ? `h-${square} w-${square}` : "h-full"} ${navigation && "cursor-pointer"}`}
            onClick={navigation && id ? () => handleNav("profil", id) : undefined}
        >
            <img alt="image de profil" className="object-cover h-full w-full rounded"
                src={src} />
        </div>
    )
}

export default AvatarContainer
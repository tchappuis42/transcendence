import { Button } from "@material-tailwind/react"
import { useAccount } from "../../ui/organisms/useAccount"
import { useState } from "react";


const ChangeUsername = () => {

    const {account} = useAccount();
    const [newUsername, setNewusername] = useState<string>(account.username);
    
    const handleChangeUsername = (event : any) => {
        console.log("event :", event.target.value)
        setNewusername(event.target.value)
    }

    return(
        <div className="w-4/5 h-1/3 bg-black/80 rounded-xl shadow-md flex flex-col justify-center items-center shadow-white">
            <h1 className="text-white">Change your username</h1>
            <input type="text" className="mt-2 px-4 py-2 bg-white text-black rounded-md" onChange={handleChangeUsername} />
            <div className="w-full flex justify-center items-center p-8">
                <Button className="w-32 h-8 rounded p-2 text-white" variant="outlined">
                    Validate
                </Button>
            </div>
        </div>
    )
}

export default ChangeUsername
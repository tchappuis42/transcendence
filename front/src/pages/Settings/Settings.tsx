import { Button, Switch } from "@material-tailwind/react";
import { useAccount } from "../../ui/organisms/useAccount";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TwoFa from "./TwoFa";
import ChangeProfilPic from "./changeProfilPic";

interface changeObj {
    value: string;
    type: boolean;
}


const Settings = () => {

    const { account } = useAccount();
    const [selectedImage, setSelectedImage] = useState<string>(account.avatar);
    const [newUsername, setNewusername] = useState<string>(account.username);
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    const [twoFaStatus, setTwoFaStatus] = useState<boolean>(account.twoFa)
    const [secret, setSecret] = useState<string | undefined>("")
    const [newAvatar, setNewAvatar] = useState<string>(account.avatar);
    const [noError, setNoError] = useState<boolean>(false)


    const handleChangeUsername = (event: any) => {
        setNewusername(event.target.value)
    }


    const navigateToProfil = () => {
        navigate("/profil", {
            state: {
                id: account.id
            }
        })
    }

    const changeSettings = async (changeObj: changeObj) => {
        try {
            const respons = await axios.post("http://localhost:4000/user/settings", changeObj, { withCredentials: true });
            return true
        }
        catch (error: any) {
            setNoError(false);
            if (error.response.request.status === 409)
                setError("Username already taken");
            if (error.response.request.status === 400)
                setError(error.response.data.message)
            return false
        }
    }

    const handleValidation = async () => {
        let promises: Promise<boolean>[] = [];
    
        if (newAvatar !== account.avatar) {
            const imageObj = {
                value: newAvatar,
                type: true
            };
            promises.push(changeSettings(imageObj));
        }
    
        if (newUsername !== account.username && newUsername.length) {
            const userNameObj = {
                value: newUsername,
                type: false
            };
            promises.push(changeSettings(userNameObj));
        }
    
        if (account.twoFa !== twoFaStatus) {
            const status = {
                value: twoFaStatus,
                secret: secret
            };
            
            await axios.post("http://localhost:4000/user/twoFaFalse", status, { withCredentials: true });
            account.twoFa = twoFaStatus;
        }
    
        try {
            const results = await Promise.allSettled(promises);
    
            const allSucceeded = results.every(result => result.status === 'fulfilled' && result.value);
    
            if (allSucceeded) {
                account.username = newUsername;
                account.avatar = newAvatar;
                navigateToProfil();
            } else {

                // setError("Username already taken or too shorte");
            }
        } catch (error) {
            setError("Intern Error");
        }
    };
    // h-[1500px] lg:h-[850px]
    return (
        <div className="w-full py-10 px-2 xl:px-20">
            <div className="flex items-center justify-center h-screen">
                <div className="w-3/5 min-w-[350px] max-w-[700px] h-4/5 min-h-[647px] bg-black/80 rounded-xl shadow-md flex flex-col justify-center items-center shadow-white">
                    {/* changeUsername */}
                    <div className="w-4/5 h-1/5  flex flex-col justify-center items-center">
                        <h1 className="text-white font-bold">Change your username</h1>
                        <input type="text" placeholder={account.username} className="mt-2 px-4 py-2 bg-white text-black rounded-md" onChange={handleChangeUsername} />
                        {error && <h2 className="text-red-500">{error}</h2>}
                    </div>
                    {/* ChangeProfilPic */}
                    <ChangeProfilPic setNewAvatar={setNewAvatar}/>
                    <TwoFa setTwoFaStatus={setTwoFaStatus} setSecret={setSecret} />
                    <div className="w-full flex justify-center items-center p-8">
                        <Button className="w-32 h-8 rounded p-2 text-white" variant="outlined" onClick={handleValidation}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings
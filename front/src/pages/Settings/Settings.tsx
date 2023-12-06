import { Button, Switch } from "@material-tailwind/react";
import { useAccount } from "../../ui/organisms/useAccount";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TwoFa from "./TwoFa";

interface changeObj {
    value : string;
    type : boolean;
}


const Settings = () => {

    const {account} = useAccount();
    const [selectedImage, setSelectedImage] = useState<string>(account.avatar);
    const [newUsername, setNewusername] = useState<string>(account.username);
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    const [twoFaStatus, setTwoFaStatus] = useState<boolean>(account.twoFa)


    const handleChangeUsername = (event : any) => {
        setNewusername(event.target.value)
    }

    const handleImageChange = (event :any) => {
        const file = event.target.files[0];
    
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setSelectedImage(imageUrl);
        }
      };

    const navigateToProfil = () => {
        navigate("/profil", {
            state: {
                id: account.id
            }
        })
    }

    const changeSettings = async (changeObj : changeObj) => {
        try {
            const respons = await axios.post("http://localhost:4000/user/settings", changeObj, {withCredentials:true});
            account.username=newUsername;
            account.avatar=selectedImage;
            navigateToProfil();
        }
        catch (error : any) {
            if (error.response.request.status === 409)
                setError("Username already taken");
        }
    }

    const handleValidation = () => {
        if (selectedImage !== account.avatar)
        {
            const imageObj = {
                value : selectedImage,
                type : true
            }
            changeSettings(imageObj);
        }
        if (newUsername !== account.username && newUsername.length)
        {
            const userNameObj = {
                value : newUsername,
                type : false
            }
            changeSettings(userNameObj);
        }
        if (account.twoFa !== twoFaStatus)
        {
            const setTwoFaFalse = async () => {
                await axios.post("http://localhost:4000/user/twoFaFalse", twoFaStatus, {withCredentials:true})
            }
            setTwoFaFalse();
            navigateToProfil();
        }
        navigateToProfil();
    }

    return (
        <div className="w-full h-[1500px] lg:h-[850px] py-10 px-2 xl:px-20" >
           <div className="flex items-center justify-center h-screen">
                <div className="w-3/5 h-4/5 bg-black/80 rounded-xl shadow-md flex flex-col justify-center items-center shadow-white">
                  {/* changeUsername */}
                  <div className="w-4/5 h-1/5  flex flex-col justify-center items-center">
                        <h1 className="text-white">Change your username</h1>
                        <input type="text" placeholder={account.username} className="mt-2 px-4 py-2 bg-white text-black rounded-md" onChange={handleChangeUsername} />
                        {error && <h2 className="text-red-500">{error}</h2>}
                    </div>
                    {/* ChangeProfilPic */}
                    <div className="w-4/5 h-1/3 flex justify-between items-center mt-5">
                        <div className="w-4/12 h-full rounded-xl flex justify-center items-center">
                        <img alt="image de profil" className="rounded-md h-5/6 ml-3"
                                src={selectedImage} />
                        </div>
                        <div className="w-7/12 h-full flex justify-center items-center rounded-xl">
                            <label className="w-1/2 h-1/2 flex justify-center items-center border-dashed border-2 border-gray-300 rounded-lg cursor-pointer">
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            <h1 className="text-white">Choose a new pic</h1>
                            </label>
                        </div>
                    </div>
                        <TwoFa setTwoFaStatus={setTwoFaStatus} />
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
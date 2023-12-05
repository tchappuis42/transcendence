import { Button } from "@material-tailwind/react";
import MenuCard from "../HomePage/MenuCard";
import ChangeUsername from "./changeUsername";
import ChangeProfilPic from "./changeProfilPic";
import { useAccount } from "../../ui/organisms/useAccount";
import { useState } from "react";


const Settings = () => {

    const {account} = useAccount();
    const [selectedImage, setSelectedImage] = useState<string>(account.avatar);
    const [newUsername, setNewusername] = useState<string>(account.username);

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

    const handleValidation = () => {
        if (selectedImage !== account.avatar)
            console.log(selectedImage);
        if (newUsername !== account.username && newUsername.length)
            console.log(newUsername);
    }

    return (
        <div className="w-full h-[1500px] lg:h-[850px] py-10 px-2 xl:px-20" >
           <div className="flex items-center justify-center h-screen">
                <div className="w-3/5 h-4/5 bg-black/80 rounded-xl shadow-md flex flex-col justify-center items-center shadow-white">
                  {/* changeUsername */}
                  <div className="w-4/5 h-1/3 bg-black/80 rounded-xl shadow-md flex flex-col justify-center items-center shadow-white">
                        <h1 className="text-white">Change your username</h1>
                        <input type="text" className="mt-2 px-4 py-2 bg-white text-black rounded-md" onChange={handleChangeUsername} />
                    </div>
                    {/* ChangeProfilPic */}
                    <div className="w-4/5 h-1/3 bg-black/80 rounded-xl shadow-md flex justify-between items-center shadow-white mt-10">
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
                        <div className="w-full flex justify-center items-center p-8">
                            <Button className="w-32 h-8 rounded p-2 text-white" variant="outlined" onClick={handleValidation}>
                                Validate
                            </Button>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Settings
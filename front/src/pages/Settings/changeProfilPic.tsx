import { Button, useAccordion } from "@material-tailwind/react"
import { useState } from "react";
import { useAccount } from "../../ui/organisms/useAccount";


const ChangeProfilPic = () => {
    const {account} = useAccount();
    const [selectedImage, setSelectedImage] = useState<string>(account.avatar);

  const handleImageChange = (event :any) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log("image url" , imageUrl);
      setSelectedImage(imageUrl);
      account.avatar = imageUrl;
    }
  };


    return(
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
    )

}

export default ChangeProfilPic
import { Button, useAccordion } from "@material-tailwind/react"
import { useState } from "react";
import { useAccount } from "../../ui/organisms/useAccount";
import { access } from "fs";
import { handleMouseEnter } from "../HomePage/Tools";
import axios from "axios";

interface TwoFaProps {

  setNewAvatar: React.Dispatch<React.SetStateAction<string>>;
}

const ChangeProfilPic: React.FC<TwoFaProps> = ({ setNewAvatar }) => {
  const {account} = useAccount();
  const [avatar, setAvatar] = useState<string>(account.avatar)
  const [selectorType, setSelectorType] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [stringToSearch, setStringToSearch] = useState<string>();

  const handleImageLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = event.target.value;
    setNewAvatar(imageUrl);
    setAvatar(imageUrl);
  };

  const handleImageSearch = () => {
    console.log("stringtotsearch :", stringToSearch)
    if (stringToSearch) {
    const handleSearch = async () => {
      try {
        const response = await axios.get(
        // TODO put apiKey in .env file
          `https://api.unsplash.com/search/photos?query=${stringToSearch}&client_id=tgK8yN3eWCXtEoZovHFiY2kxaCA7G7KtOwKUYK_ZqSE`
        );
        setAvatar(response.data.results[0].urls.small);
        setNewAvatar(response.data.results[0].urls.small);
        setError("");
      } catch (error : any) {
        console.error('Error fetching images:', error.response.data);
        setError(error.response.data + " (50 req per hour)")
      }
    };
    handleSearch();
  }
}
 

    return(
        <div className="w-4/5 h-1/3 flex justify-between items-center mt-5">
        <div className="w-4/12 h-full rounded-xl flex justify-center items-center">
            <img alt="image de profil" className="rounded-md h-5/6 ml-3"
                src={avatar}/>
        </div>
        <div className="w-7/12 h-full flex flex-col justify-center items-center rounded-xl">
            <h1 className="text-white">Choose a new pic</h1>
            <label className="w-1/2 h-1/4 flex justify-center items-center rounded-lg cursor-pointer">
            <button className=" rounded h-full w-1/2 mr-2 border-dashed border-2 border-gray-300" onClick={() => setSelectorType(false)}>
              <h3 className="text-white hover:transform hover:scale-150 transition duration-300">Link</h3>
            </button>
              <button className=" h-full rounded w-1/2 border-dashed border-2 border-gray-300" onClick={() => setSelectorType(true)}>
                <h3 className="text-white hover:transform hover:scale-150 transition duration-300">Choose</h3>
              </button>
            </label>
            {!selectorType ? (
              <div className="mt-5">
                <input type="text" onChange={handleImageLink} className="rounded w-full" placeholder="Enter an image link"/>
              </div>
            ):(
              <div>

              <div className="mt-5 flex flex-row justify-center items-center">
                <input type="text" onChange={(event) => setStringToSearch(event.target.value)} className="rounded w-full h-8" placeholder="Search a picture"/>
                <div className="w-1/2 flex justify-center items-center">
                        <Button className="w-18 h-8 rounded p-2 text-white" variant="outlined" onClick={handleImageSearch}>
                            Search
                        </Button>
                    </div>
              </div>
                {error && <h2 className="text-red-500">{error}</h2>}
              </div>
            )
            }
        </div>
    </div>
    )

}

export default ChangeProfilPic
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
  const { account } = useAccount();
  const [avatar, setAvatar] = useState<string>(account.avatar)
  const [selectorType, setSelectorType] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [stringToSearch, setStringToSearch] = useState<string>();

  const handleImageLink = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = event.target.value;
    if (imageUrl.length === 0) {
      setError("");
      return
    }

      setError('');
      setNewAvatar(imageUrl);
      setAvatar(imageUrl);
  };


  const handleImageSearch = () => {
    if (stringToSearch) {
      const handleSearch = async () => {
        try {
          const prerep = await axios.get("/api/user/apiPic", { withCredentials: true });
          const apiKey = prerep.data.apiKey;
          const response = await axios.get(
            `https://api.unsplash.com/search/photos?query=${stringToSearch}&client_id=${apiKey}`
          );
          setAvatar(response.data.results[0].urls.small);
          setNewAvatar(response.data.results[0].urls.small);
          setError("");
        } catch (error: any) {   
          console.error('Error fetching images');
          setError("Error searching for image");
        }
      };
      handleSearch();
    }
  }

  //modifs:
  // image: aspect-square object-cover min-w-[100px]
  return (
    <div className="w-4/5 h-1/4 flex justify-between items-center mt-5  ">
      <div className="w-4/12 h-full rounded-xl flex justify-center items-center">
        <img alt="image de profil" className="aspect-square h-full object-cover min-w-[100px] rounded-md ml-3 border-2 border-white"
          src={avatar} />
      </div>
      <div className="w-7/12 min-w-[180px] h-full flex flex-col justify-center items-center rounded-md border-2 border-white p-2">
        <h1 className="text-white px-2 py-4 font-bold">Choose a new pic</h1>
        <label className="w-full flex justify-center items-center rounded-lg cursor-pointer">
          <Button className="w-1/3 min-w-[60px] h-8 rounded mr-2 text-white" variant="outlined" onClick={() => setSelectorType(false)}>
            <h3 className="text-white hover:transform hover:scale-110 transition duration-300">Link</h3>
          </Button>
          <Button className="w-1/3 min-w-[60px] h-8 rounded mr-2 text-white" variant="outlined" onClick={() => setSelectorType(true)}>
            <h3 className="text-white hover:transform hover:scale-110 transition duration-300">search</h3>
          </Button>
        </label>
        {!selectorType ? (
          <div className="mt-5">
            <input type="text" onChange={handleImageLink} className="rounded w-full" placeholder="Enter an image link" />
            {error && <h2 className="text-red-500">{error}</h2>}
          </div>
        ) : (
          <div className="">

            <div className="mt-5 flex flex-row justify-center items-center">
              <input type="text" onChange={(event) => setStringToSearch(event.target.value)} className="rounded w-full h-8" placeholder="Search a picture" />
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
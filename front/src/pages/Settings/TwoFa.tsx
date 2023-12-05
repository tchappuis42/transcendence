import { Button } from "@material-tailwind/react"
import { useAccount } from "../../ui/organisms/useAccount"
import { useEffect, useState } from "react";
import axios from "axios";
import { createPortal } from "react-dom";


interface TwoFa {
    code : string,
    qrcode : string,
}

const TwoFa = () => {

    const {account} = useAccount();
    const [QRCodeBol, setQrCodeBol] = useState<boolean>(account.twoFa);
    const [TwoFa, setTwoFa] = useState<TwoFa>();
    const [codeValidation, setCodeValidation] = useState<number>()
    const [error, setError] = useState<string>();
    
    const handleCheckBoxChange = () => {
        setQrCodeBol(!QRCodeBol)
        if (!QRCodeBol)
        {
            const fetchQrCode = async () => {
                try {
                    const response = await axios.get("http://localhost:4000/user/TwoFa", {withCredentials:true})
                    console.log("respons : ", response.data);
                    setTwoFa(response.data)
                }
                catch {
                    console.error("pas de Qr code pour toi")
                }
            }
            fetchQrCode();
        }
    }

    const handleCodeValidation = (event : any) => {
        const validationObj = {
            code : TwoFa?.code,
            validation : codeValidation,
        }
        console.log("code xoee xsoe :", validationObj)
        const postTwoValidation = async () => {
            try {
                await axios.post("http://localhost:4000/user/twoFaKey", validationObj , {withCredentials:true})
                setError("Success")
            }
            catch (error) {
                console.log("errooooor :", error)
                setError("Wrong code")
            }
        }
        postTwoValidation()
       console.log(codeValidation);
    }

    const handlePopupClose = () => {
        setQrCodeBol(false);
    };

    return(
        <div className="w-5/6 flex justify-between bg-black items-center">
        <div className=" w-1/6 flex flex-row mt-5">
            <input type={"checkbox"} checked={QRCodeBol} className="w-5" onChange={handleCheckBoxChange}>
            </input>
            <h1 className="text-white ">Activate 2FA</h1>
        </div>
        {QRCodeBol && (
                // Utilisation du portail pour la pop-up
                createPortal(
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-80 z-50">
                        <div className="w-80 bg-white rounded-lg p-8">
                            <button onClick={handlePopupClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                                Close
                            </button>
                            {/* Votre contenu de la pop-up */}
                            <img src={TwoFa?.qrcode} alt="QrCode" />
                            <input type="number" onChange={(event: any) => setCodeValidation(event.target.value)} className="mt-5" />
                            {error && <h2 className="text-red-500">{error}</h2>}
                            <div className="w-full flex justify-center items-center p-8">
                                <Button className="w-32 h-8 rounded p-2 text-white" variant="outlined" onClick={handleCodeValidation}>
                                    Validate
                                </Button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )
            )}
            </div>
    )
}

export default TwoFa
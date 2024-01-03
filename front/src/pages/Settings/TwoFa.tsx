import { Button } from "@material-tailwind/react"
import { useAccount } from "../../ui/organisms/useAccount"
import { useEffect, useState } from "react";
import axios from "axios";
import { createPortal } from "react-dom";
import { useAuth } from "../../ui/organisms/useAuth";

type validationObj = {
    code: string,
    validation: string,
}

interface TwoFa {
    code: string,
    qrcode: string,
}

interface TwoFaProps {
    setTwoFaStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setSecret: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TwoFa: React.FC<TwoFaProps> = ({ setTwoFaStatus, setSecret }) => {

    const { account } = useAccount();
    const [QRCodeBol, setQrCodeBol] = useState<boolean>(account.twoFa);
    const [TwoFa, setTwoFa] = useState<TwoFa | null>(null);
    const [codeValidation, setCodeValidation] = useState<string>()
    const [error, setError] = useState<string>();
    const [codeValidated, setCodeValidated] = useState<boolean>(false);
    const { authenticate } = useAuth();

    const handleCheckBoxChange = () => {

        setQrCodeBol(!QRCodeBol)
        if (!QRCodeBol) {
            const fetchQrCode = async () => {
                try {
                    const response = await axios.get("/api/user/TwoFa", { withCredentials: true })
                    setTwoFa(response.data)
                }
                catch (error: any) {
                    console.error("pas de Qr code pour toi")
                    if (error.response.request.status === 401)
                        authenticate();
                }
            }
            fetchQrCode();
        }
        if (QRCodeBol) {
            setTwoFaStatus(false);
        }
    }

    const handleCodeValidation = (event: any) => {
        if (TwoFa && codeValidation) {

            const validationObj : validationObj = {
                code: TwoFa?.code,
                validation: codeValidation,
            }
            const postTwoValidation = async () => {
                try {
                    await axios.post("/api/user/twoFaKey", validationObj, { withCredentials: true })
                    setError("Success")
                    setCodeValidated(true);
                    setTwoFaStatus(true);
                    setSecret(TwoFa?.code);
                }
                catch (error: any) {
                    setError("Wrong code")
                    if (error.response.request.status === 401)
                    authenticate();
            }
        }
        postTwoValidation()
    }   
    }

    const handlePopupClose = () => {
        setError("")
        setQrCodeBol(false);
        setTwoFaStatus(false);
    };

    return (
        <div className="w-5/6 flex justify-center items-center mt-10">
            <div className=" w-2/6 min-w-[200px] flex justify-around border-2 border-white p-2 rounded border-dashed ">
                <input type={"checkbox"} checked={QRCodeBol} className="w-6 rounded-full" onChange={handleCheckBoxChange}>
                </input>
                <h1 className="text-white ">Activate 2FA</h1>
            </div>
            {QRCodeBol && TwoFa?.qrcode && !codeValidated && (
                createPortal(
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50">
                        <div className="w-80 rounded-lg p-8 bg-gray-900">
                            <div className="h-1/5 w-full flex flex-row-reverse">
                                <button onClick={handlePopupClose} className="text-gray-500 hover:text-gray-800 rounded-full">
                                    <h1 className="text-red-500 font-bold">X</h1>
                                </button>
                            </div>
                            <div className="h-3/5 w-full flex justify-center items-center mt-3">
                                <img src={TwoFa?.qrcode} alt="QrCode" className="rounded" />
                            </div>
                            <div className="h-3/5 w-full flex justify-center items-center mt-5 flex-col">
                                <input type="number" onChange={(event: any) => setCodeValidation(event.target.value)} className="w-2/3 rounded h-8" placeholder="Code" />
                                {error && <h2 className="text-red-500">{error}</h2>}
                            </div>
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
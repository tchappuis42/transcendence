import React, { useState, useEffect } from "react";
import axios from "axios";
import { redirect, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../ui/organisms/useAuth';
import TwoFaForm from "./TwofaForm";

const WaitingForConnection = () => {
  const [code] = useSearchParams();
  const codeParam = code.get('code');
  const [pageMessage, setPageMessage] = useState("Loading...");
  const { authenticate } = useAuth();
  const navigate = useNavigate()
  const [has2fa, setHas2fa] = useState(false)

  useEffect(() => {
    const sendDataToBackend = async () => {
      try {
        if (codeParam) {
          const response = await axios.post("/api/authentication/api",
            { code: codeParam },
            { withCredentials: true },
          );

          if (response.status <= 400) {
            setPageMessage("Data sent successfullyyy!");
            if (response.data.message) {
              authenticate();
              navigate("/", { replace: true })
            } else {
              setHas2fa(true)
            }
          }
        } else {
          setPageMessage("Error: Unexpected response from the server");

        }
      } catch (error) {
        // Handle errors gracefully
        setPageMessage("Error contacting the server. Please try again later.");
        console.error("Error:", error);
      }
    };

    sendDataToBackend();
  }, [codeParam]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {
        has2fa ?
          <TwoFaForm
            settingPage={(page: string) => {
              navigate("/", { replace: true })
            }}
            onSubmit={() => {
              navigate("/", { replace: true })
            }}
          /> :
          <>
            <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-white rounded-full mb-4"></div>
            <h1 className='text-lg font-semibold mb-2 text-white'>Connecting to API</h1>
          </>
      }
    </div>
  );
};


export default WaitingForConnection;
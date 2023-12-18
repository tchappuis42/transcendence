import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../ui/organisms/useAuth';

interface Props {
  settingPage: (newPage: string) => void;
}


const WaitingForConnection: React.FC<Props> = ({settingPage}) => {
  const [code] = useSearchParams();
  const codeParam = code.get('code');
  const [pageMessage, setPageMessage] = useState("Loading...");
  const { authenticate } = useAuth();
 
  useEffect(() => {
    const sendDataToBackend = async () => {
      try {
        if (codeParam) {
          const response = await axios.post("http://localhost:4000/authentication/api", {
            code: codeParam,
          });

          if (response.status <= 400) {
            setPageMessage("Data sent successfully!");
            if (response.data.message) {
              authenticate();
            } else {
              settingPage("twofa")
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
    <div>
      <h1 className='text'>Connecting to API</h1>
      <div className='divtest'>
        Code is: {codeParam}
      </div>
      <div className="mt-3 h-6 text-center text-sm">{pageMessage}</div>
    </div>
  );
};


export default WaitingForConnection;


// authenticate();
// } else {
//   settingPage("twofa")
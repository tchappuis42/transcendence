import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from 'react-router-dom';

const WaitingForConnection = () => {
  const [code] = useSearchParams();
  const codeParam = code.get('code');
  const [pageMessage, setPageMessage] = useState("Loading...");
  const navigate = useNavigate();

  useEffect(() => {
    const sendDataToBackend = async () => {
      try {
        if (codeParam) {
          const response = await axios.post("http://localhost:4000/authentication/api", {
            code: codeParam,
          });

          if (response.status <= 400) {
            setPageMessage("Data sent successfully!");
            // Redirect to a different route after successful API interaction
            }
          } else {
            setPageMessage("Error: Unexpected response from the server");
          }
        } else {
          setPageMessage("Problem logging in to the API (empty code)");
        }
      } catch (error) {
        // Handle errors gracefully
        setPageMessage("Error contacting the server. Please try again later.");
        console.error("Error:", error);
      }
    };

    sendDataToBackend();
  }, [codeParam, navigate]);

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

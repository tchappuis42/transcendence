import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from 'react-router-dom';

const WaitingForConnection = () => {
  // Extract the 'code' parameter from the URL using useSearchParams
  const [code] = useSearchParams();
  const codeParam = code.get('code');

  // State variable to hold the message displayed on the page
  const [pageMessage, setPageMessage] = useState("Loading...");

  // React Router hook to enable navigation within the application
  const navigate = useNavigate();

  // useEffect hook runs side effects in function components
  useEffect(() => {
    // Define an asynchronous function to send data to the backend
    const sendDataToBackend = async () => {
      try {
        // Check if 'codeParam' is not empty
        if (codeParam) {
          // Send a POST request to the backend with the 'codeParam'
          const response = await axios.post("http://localhost:4000/authentication/api", {
            code: codeParam,
          });

          // Assuming a successful response (you may need to adjust this based on your backend)
          if (response.status <= 400) {
            // Update the pageMessage state if the data is sent successfully
            setPageMessage("Data sent successfully!");

            // Use the navigate function to redirect to a different route (e.g., '/')
            // navigate("/");
          } else {
            // Update the pageMessage state if there is an unexpected response from the server
            setPageMessage("Error: Unexpected response from the server");
          }
        } else {
          // Update the pageMessage state if 'codeParam' is empty
          setPageMessage("Problem login to the Api (empty code)");
        }
      } catch (error) {
        // Update the pageMessage state if there is an error contacting the server
        setPageMessage("Error contacting the server");
        console.error("Error:", error);
      }
    };

    // Call the asynchronous function when the component mounts or 'codeParam' changes
    sendDataToBackend();
  }, [codeParam, navigate]);

  // JSX structure for rendering the component
  return (
    <div>
      <h1 className='text'>Connecting to Api</h1>
      <div className='divtest'>
        Code is: {codeParam}
      </div>
      <div className="mt-3 h-6 text-center text-sm">{pageMessage}</div>
    </div>
  );
};

export default WaitingForConnection;
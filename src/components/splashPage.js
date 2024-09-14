import React, { useEffect, useState , useRef} from "react";
import LoadingComponent from "./loadingComponent";

const greeting = 'Hello! Welcome to Voices, a website dedicated to the book, "Voices from the Railroad", a collection of stories about the Chinese Americans who built the railroads.';

const SplashPage = () => {
  const [message, setMessage] = useState("");
  const intervalIdRef = useRef(null); // Use useRef to store interval ID

  useEffect(() => {
    let intervalId; // Declare intervalId here so it's accessible in the cleanup function

    const handleMessage = (m) => {
      let i = 0;
      intervalIdRef.current = setInterval(() => {
        setMessage(prev => {
            if(i<m.length){
                const newMessage = prev +m[i];
                i +=1;
                return newMessage
            }else{
                clearInterval(intervalIdRef.current)
                return prev;
            }            

        });
      }, 200);
    };

    handleMessage(greeting);

    // Cleanup interval on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return (
    <div className="splash-page">
      <div className="container">       
      <div className="row d-flex justify-content-center">
        <div className="col-12">
        <div className = "loading-container">
          
            <LoadingComponent/>
            

        </div>
        </div>
        <div className = "col-12">


        <div id="wrap">
          <div class="ball"></div>
          <div class="ball"></div>
          <div class="ball"></div>
          <div class="ball"></div>
        </div>
        </div>

        <div className = "message-container">
        <h1 className="text-center">
          {message} <div className= "text-typewriter" />
        </h1>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SplashPage;

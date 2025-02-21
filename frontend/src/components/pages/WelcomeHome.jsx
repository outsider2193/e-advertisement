import React from 'react'
import "../../assets/welcomestyle.css";
import { useNavigate } from 'react-router-dom';

export const WelcomeHome = () => {

    const navigate = useNavigate();

    const handleStart = ()=>{
        navigate('/specificregister');
    }


  return (
    <div className="welcome-container">
        <h1 className="welcome-title">Welcome to AdVerse</h1>
      <p className="welcome-text">
        Discover and advertise your products effectively with our platform.
      </p>
      <button className="welcome-btn" onClick={handleStart}>Get Started</button>
    </div>
  )
}

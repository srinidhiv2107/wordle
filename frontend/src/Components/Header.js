import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Header.css';
import wordleImage from "../assets/wordle.png";

const Header = ({ displayHelp, displayStats, user }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsBtnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if(optionsBtnRef.current && !optionsBtnRef.current.contains(event.target))
        setShowOptions(false);
    };
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [showOptions]);

  return (
    <div className="header">
      <div className="title">
        <img src={wordleImage} alt="Wordle"/>
        <h2>Wordle</h2>
      </div>
      <div className="tools">
        <i className="material-symbols-rounded"
           onClick={displayHelp}>help</i>
        <i className="material-symbols-rounded"
           onClick={displayStats}>bar_chart</i>
        <div className="account">
          <p>{user}</p>
          <i className="material-symbols-rounded"
             ref={optionsBtnRef}
             onClick={() => setShowOptions(!showOptions)}
          >account_circle</i>
          {
            showOptions &&
            <div className="options">
              <div className="option" onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}>Logout
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Header;

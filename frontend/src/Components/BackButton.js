import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/BackButton.css'

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="back-button" onClick={() => navigate('/')}>
        <i className="material-symbols-rounded">arrow_back</i>
      </div>
      <div className="info">Home page</div>
    </div>
  );
};

export default BackButton;

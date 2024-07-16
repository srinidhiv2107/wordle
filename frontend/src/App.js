import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Game from './Components/Game';
import './App.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Welcome/> } />
        <Route path="/signup" element={ <Signup/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/game" element={ <Game/> } />
      </Routes>
    </>
  );
}

export default App;

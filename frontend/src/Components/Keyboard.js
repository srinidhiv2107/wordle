import React from 'react';
import '../Styles/Keyboard.css';

const Keyboard = ({ keyStates, keyPress, deleteKey, submitGuess }) => {
    return (
      <div className="keyboard">
          <button className={`key ${keyStates['q']}`} onClick={() => keyPress('q')}>Q</button>
          <button className={`key ${keyStates['w']}`} onClick={() => keyPress('w')}>W</button>
          <button className={`key ${keyStates['e']}`} onClick={() => keyPress('e')}>E</button>
          <button className={`key ${keyStates['r']}`} onClick={() => keyPress('r')}>R</button>
          <button className={`key ${keyStates['t']}`} onClick={() => keyPress('t')}>T</button>
          <button className={`key ${keyStates['y']}`} onClick={() => keyPress('y')}>Y</button>
          <button className={`key ${keyStates['u']}`} onClick={() => keyPress('u')}>U</button>
          <button className={`key ${keyStates['i']}`} onClick={() => keyPress('i')}>I</button>
          <button className={`key ${keyStates['o']}`} onClick={() => keyPress('o')}>O</button>
          <button className={`key ${keyStates['p']}`} onClick={() => keyPress('p')}>P</button>
          <div className="space"></div>
          <button className={`key ${keyStates['a']}`} onClick={() => keyPress('a')}>A</button>
          <button className={`key ${keyStates['s']}`} onClick={() => keyPress('s')}>S</button>
          <button className={`key ${keyStates['d']}`} onClick={() => keyPress('d')}>D</button>
          <button className={`key ${keyStates['f']}`} onClick={() => keyPress('f')}>F</button>
          <button className={`key ${keyStates['g']}`} onClick={() => keyPress('g')}>G</button>
          <button className={`key ${keyStates['h']}`} onClick={() => keyPress('h')}>H</button>
          <button className={`key ${keyStates['j']}`} onClick={() => keyPress('j')}>J</button>
          <button className={`key ${keyStates['k']}`} onClick={() => keyPress('k')}>K</button>
          <button className={`key ${keyStates['l']}`} onClick={() => keyPress('l')}>L</button>
          <div className="space"></div>
          <button className="key large" onClick={() => submitGuess()}>Enter</button>
          <button className={`key ${keyStates['z']}`} onClick={() => keyPress('z')}>Z</button>
          <button className={`key ${keyStates['x']}`} onClick={() => keyPress('x')}>X</button>
          <button className={`key ${keyStates['c']}`} onClick={() => keyPress('c')}>C</button>
          <button className={`key ${keyStates['v']}`} onClick={() => keyPress('v')}>V</button>
          <button className={`key ${keyStates['b']}`} onClick={() => keyPress('b')}>B</button>
          <button className={`key ${keyStates['n']}`} onClick={() => keyPress('n')}>N</button>
          <button className={`key ${keyStates['m']}`} onClick={() => keyPress('m')}>M</button>
          <button className="key large" onClick={() => deleteKey()}>
              <i className="material-symbols-rounded">backspace</i>
          </button>
      </div>
    );
};

export default Keyboard;

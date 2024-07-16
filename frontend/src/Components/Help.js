import React from 'react';
import '../Styles/Help.css';

const Help = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>How To Play</h2>
        <p>Guess the Wordle in 6 tries.</p>
        <ul>
          <li>Each guess must be a valid 5-letter word.</li>
          <li>The color of the tiles will change to show how close your guess was to the word.</li>
        </ul>
        <h3>Examples</h3>
        <div className="tiles">
          {['G', 'R', 'A', 'C', 'E'].map((letter, index) => (
            <div key={index} className={`tile ${letter === 'G' ? 'correct' : ''}`}>{letter}</div>
          ))}
        </div>
        <p>G is in the word and in the correct spot.</p>
        <div className="tiles">
          {['P', 'O', 'L', 'L', 'S'].map((letter, index) => (
            <div key={index} className={`tile ${letter === 'O' ? 'wrong-location' : ''}`}>{letter}</div>
          ))}
        </div>
        <p>O is in the word but in the wrong spot.</p>
        <div className="tiles">
          {['V', 'A', 'L', 'I', 'D'].map((letter, index) => (
            <div key={index} className={`tile ${letter === 'D' ? 'wrong' : ''}`}>{letter}</div>
          ))}
        </div>
        <p>D is not in the word in any spot.</p>
      </div>
    </div>
  );
};

export default Help;

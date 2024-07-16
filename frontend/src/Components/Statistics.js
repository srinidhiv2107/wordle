import React from 'react';
import '../Styles/Statistics.css';

const Statistics = ({ onClose, statistics }) => {
  const { gamesPlayed, wins, guessDistribution } = statistics;
  const winPercentage = ((wins / (gamesPlayed? gamesPlayed: 1)) * 100).toFixed(0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <h2>Wordle</h2>
          <p>statistics</p>
        </div>
        {(statistics.gamesPlayed > 10)?
          <>
            <div className="statistics">
              <div className="stat">
                <h3>{gamesPlayed}</h3>
                <p>Played</p>
              </div>
              <div className="stat">
                <h3>{wins}</h3>
                <p>Wins</p>
              </div>
              <div className="stat">
                <h3>{winPercentage}</h3>
                <p>Win %</p>
              </div>
            </div>
            <h4 style={{margin: 0}}>Guess Distribution</h4>
            <div className="guess-distribution">
              {guessDistribution.map((count, index) => (
                <div key={index} className="guess-bar">
                  <span className="guess-number">{index + 1}</span>
                  <div className="bar" style={{width: `${count}%`}}>
                    <p>{count}</p>
                  </div>
                </div>
              ))}
            </div>
        </>
        :
          <p style={{margin: "10px 0", textAlign: "center"}}>
            Not enough data to show stats
          </p>
      }
      </div>
    </div>
  );
};

export default Statistics;

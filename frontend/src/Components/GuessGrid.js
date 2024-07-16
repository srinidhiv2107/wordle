import React from 'react';

const GuessGrid = ({ tiles, tileRefs }) => {
  const setTileRef = (index) => (element) => {
    tileRefs.current[index] = element;
  };

  return (
    <div className="guess-grid">
      {
        tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile.state}`}
            ref={setTileRef(index)}
          >
            {tile.letter}
          </div>
        ))
      }
    </div>
  );
};

export default GuessGrid;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { showToast } from './Toast';
import Header from './Header';
import Help from './Help';
import Statistics from './Statistics';
import GuessGrid from './GuessGrid';
import Keyboard from './Keyboard';
import { dictionary } from './Dictionary';
import { targetWords } from './TargetWords';
import '../Styles/Game.css';
import '../Styles/GuessGrid.css';

const Game = () => {
  const [user, setUser] = useState("");
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [stats, setStats] = useState({});
  const [isStatisticsModalOpen, setIsStatisticsModalOpen] = useState(false);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [targetWord, setTargetWord] = useState("");
  const [tiles, setTiles] = useState(() => {
    return Array.from({length: 30}, () => (
      {letter: '', state: ''}
    ));
  });
  const [keyStates, setKeyStates] = useState(() => {
    let alphabets = {};
    for(let i = 0; i < 26; ++i) {
      let letter = String.fromCharCode(97 + i);
      alphabets[letter] = "";
    }
    return alphabets;
  });
  const tileRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if(!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get("http://localhost:3001/api/auth/user", {
          headers: {
            "token": token
          }
        });

        if(response.data.error) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        setUser(response.data.username);
        setStats(response.data.statistics);
        console.log(stats);
      }
      catch(error) {
        console.log("Error fetching user: ", error);
      }
    };

    fetchUser();
    const randomWord = targetWords[Math.floor(Math.random() * targetWords.length)];
    setTargetWord(randomWord);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if(/^[a-zA-Z]$/.test(key)) keyPress(key);
      else if(key === "Backspace" || key === "Delete") deleteKey();
      else if(key === "Enter") submitGuess();
    };
    if(!isHelpModalOpen && !isStatisticsModalOpen)
      window.addEventListener('keydown', handleKeyDown);

    return () => {
      if(!isHelpModalOpen && !isStatisticsModalOpen)
        window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, [col, isStatisticsModalOpen, isHelpModalOpen]);

  const updateStatsInDB = async (win=false, guessNumber=0) => {
    const token = localStorage.getItem("token");
    if(!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/api/auth/user", {
        win, guessNumber
      },{
        headers: {
          "token": token
        }
      });

      if(response.data.error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
    catch(error) {
      console.log("Error updating stats: ", error);
    }
  }

  const keyPress = (key) => {
    if(col === 5) return;

    key = key.toLowerCase();
    const index = row * 5 + col;
    popup(index);
    setTimeout(() => {
      setTiles(prevTiles => {
        const newTiles = [...prevTiles];
        newTiles[index].letter = key;
        newTiles[index].state = "active";
        return newTiles;
      });
      setCol(col + 1);
    }, 50);
  }

  const popup = (index) => {
    tileRefs.current[index].classList.add("popup");
    tileRefs.current[index].addEventListener(
      "animationend",
      () => {
        tileRefs.current[index].classList.remove("popup");
      },
      { once: true }
    );
  }

  const deleteKey = () => {
    if(col > 0) {
      setTiles(prevTiles => {
        const newTiles = [...prevTiles];
        const index = row * 5 + (col - 1);
        newTiles[index].letter = '';
        newTiles[index].state = '';
        return newTiles;
      });
      setCol(col - 1);
    }
  }

  const submitGuess = () => {
    if(col < 5) {
      showToast("Not enough letters");
      shakeTiles();
      return;
    }

    const guess = tiles.slice(row * 5, row * 5 + col).reduce((word, tile) => (
      word + tile.letter
    ), "");
    if(!dictionary.includes(guess)) {
      showToast("Not in word list");
      shakeTiles();
      return;
    }

    flipTiles(guess);
  }

  const shakeTiles = () => {
    tileRefs.current.slice(row * 5, row * 5 + col).forEach(tile => {
      tile.classList.add("shake");
      tile.addEventListener(
        "animationend",
        () => {
          tile.classList.remove("shake");
        },
        { once: true }
      );
    });
  }

  const flipTiles = (guess) => {
    let targetWordCopy = Array.from(targetWord);
    let states = Array.from({length : 5}, () => "");
    for(let i = 0; i < 5; ++i) {
      if(guess[i] === targetWordCopy[i]) {
        states[i] = "correct";
        targetWordCopy[i] = '$';
      }
    }
    for(let i = 0; i < 5; ++i) {
      if(states[i] === "") {
        if(targetWordCopy.indexOf(guess[i]) !== -1) {
          states[i] = "wrong-location";
          targetWordCopy[targetWordCopy.indexOf(guess[i])] = '$';
        }
        else states[i] = 'wrong';
      }
    }

    tileRefs.current.slice(row * 5, row * 5 + col).forEach((tile, index) => {
      const letter = guess[index];
      setTimeout(() => {
        tile.classList.add("flip");
      }, (index * 500) / 2);

      tile.addEventListener(
        "transitionend",
        () => {
          tile.classList.remove("flip");
          handleTilesStateChange(index, states[index]);
          handleKeyStatesChange(letter, states[index]);
          if(index === 4) checkWinLose(guess);
        },
        { once: true }
      );
    });
  }

  const handleKeyStatesChange = (letter, state) => {
    setKeyStates(prevKeyStates => ({
      ...prevKeyStates,
      [letter]:
        prevKeyStates[letter] === "correct"
          ? "correct"
          : prevKeyStates[letter] === "wrong-location" && state === "wrong"
            ? "wrong-location"
            : state
    }));
  }

  const handleTilesStateChange = (index, state) => {
    setTiles(prevTiles => {
      const newTiles = [...prevTiles];
      newTiles[row * 5 + index].state = state;
      return newTiles;
    });
  }

  const checkWinLose = (guess) => {
    if(guess === targetWord) {
      showToast("You Win", 3000);
      danceTiles(tiles);
      updateStatsInDB(true, row);
      setTimeout(() => {
        updateStats(true, row);
        setIsStatisticsModalOpen(true);
      }, 4000);
      setTimeout(() => {
        resetGame();
      }, 7000);
      return;
    }

    if(row === 5) {
      showToast(targetWord.toUpperCase(), 3000);
      updateStatsInDB();
      setTimeout(() => {
        updateStats();
        setIsStatisticsModalOpen(true);
      }, 4000);
      setTimeout(() => {
        resetGame();
      }, 7000);
    }
    else {
      setRow(row + 1);
      setCol(0);
    }
  }

  const danceTiles = () => {
    tileRefs.current.slice(row * 5, row * 5 + col).forEach((tile, index) => {
      setTimeout(() => {
        tile.classList.add("dance");
        tile.addEventListener(
          "animationend",
          () => {
            tile.classList.remove("dance")
          },
          { once: true }
        );
      }, (index * 500) / 5);
    });
  }

  const updateStats = (win=false, guessNumber=0) => {
    setStats(prevStats => {
      const newStats = prevStats;
      newStats["gamesPlayed"] += 1;
      if(win) {
        newStats["wins"] += 1;
        newStats["guessDistribution"][guessNumber] += 1
      }
      return newStats;
    });
  }

  const resetGame = () => {
    setRow(0);
    setCol(0);
    setTiles(Array.from({ length: 30 }, () => ({ letter: '', state: '' })));
    setKeyStates(() => {
      let alphabets = {};
      for(let i = 0; i < 26; ++i) {
        let letter = String.fromCharCode(97 + i);
        alphabets[letter] = "";
      }
      return alphabets;
    });
    const randomWord = targetWords[Math.floor(Math.random() * targetWords.length)];
    setTargetWord(randomWord);
  }

  return (
    <div className="container">
      <Toaster/>
      <Header
        displayHelp={() => setIsHelpModalOpen(true)}
        displayStats={() => setIsStatisticsModalOpen(true)}
        user={user}
      />
      <div className="content">
        <GuessGrid tiles={tiles} tileRefs={tileRefs}/>
        <Keyboard keyStates={keyStates} keyPress={keyPress}
                  deleteKey={deleteKey} submitGuess={submitGuess}/>
        {isHelpModalOpen &&
          <Help isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)}/>
        }
        {isStatisticsModalOpen &&
          <Statistics
            onClose={() => setIsStatisticsModalOpen(false)}
            statistics={stats}
          />
        }
      </div>
    </div>
  );
};

export default Game;

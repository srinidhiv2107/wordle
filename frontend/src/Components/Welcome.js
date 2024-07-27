import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import wordleImage from '../assets/wordle.png';
import '../Styles/Welcome.css';

const WelcomePage = () => {
  const wordle = ['W', 'O', 'R', 'D', 'L', 'E'];
  const cellRefs = useRef([]);

  useEffect(() => {
    startAnimation();
    const intervalId = setInterval(startAnimation, 9000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);

  const setCellRef = (index) => (element) => {
    cellRefs.current[index] = element;
  };

  const startAnimation = () => {
    resetCells();
    setTimeout(() => {
      addActiveClass(); // 1250 + 50
    }, 1000);
    setTimeout(() => {
      flipCells(); // 1250 + 250
    }, 2300);
    setTimeout(() => {
      danceCells();
    }, 3800);
  }

  const resetCells = () => {
    wordle.forEach((_, index) => {
      const cell = cellRefs.current[index];
      if (cell) {
        cell.textContent = '';
        cell.className = 'cell';
      }
    });
  }

  const addActiveClass = () => {
    wordle.forEach((letter, index) => {
      setTimeout(() => {
        popup(index);
        setTimeout(() => {
          const cell = cellRefs.current[index];
          if(cell) {
            cell.textContent = letter;
            cell.classList.add("active");
          }
        }, 70);
      }, 250 * index);
    });
  }

  const popup = (index) => {
    const cell = cellRefs.current[index];
    if(cell) {
      cell.classList.add("popup");
      cell.addEventListener(
        "animationend",
        () => {
          if(cell) {
            cell.classList.remove("popup");
          }
        },
        { once: true }
      );
    }
  }

  const flipCells = () => {
    wordle.forEach((_, index) => {
      setTimeout(() => {
        const cell = cellRefs.current[index];
        if(cell) {
          cell.classList.add("flip");
        }
      }, (index * 500) / 2);

      const cell = cellRefs.current[index];
      if(cell) {
        cell.addEventListener(
          "transitionend",
          () => {
            if(cell) {
              cell.classList.remove("flip");
              cell.classList.remove("active");
              cell.classList.add("correct");
            }
          },
          { once: true }
        );
      }
    });
  }

  const danceCells = () => {
    wordle.forEach((_, index) => {
      setTimeout(() => {
        const cell = cellRefs.current[index];
        if(cell) {
          cell.classList.add("dance");
          cell.addEventListener(
            "animationend",
            () => {
              if(cell) {
                cell.classList.remove("dance");
              }
            },
            { once: true }
          );
        }
      }, (index * 500) / 5);
    });
  }

  return (
    <div className="welcome-container">
      <img src={wordleImage} alt="Wordle" className="welcome-image" />
      <div className="cells">
        {
          Array.from({ length: 6 }).map((val, index) => (
            <div key={index}
                 className="cell"
                 ref={setCellRef(index)}
            ></div>
          ))
        }
      </div>
      <p className="description">
        Get 6 chances to guess a 5-letter word.
      </p>
      <div className="welcome-button-wrapper">
        <Link to="/signup" className="welcome-button">Get Started</Link>
        <Link to="/login" className="welcome-button">Login</Link>
      </div>
    </div>
  );
};

export default WelcomePage;

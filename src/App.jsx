/* eslint-disable jsx-quotes */
import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import './App.css';

const allSquaresOpen = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [chooseTeam, setChooseTeam] = useState(true);
  const [team, setTeam] = useState('X');
  const [computerTurn, setComputerTurn] = useState(false);
  const [availableSquares, setAvailableSquares] = useState(allSquaresOpen);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [2, 5, 8],
      [1, 4, 7],
      [0, 3, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const gameDisabled = chooseTeam || computerTurn || calculateWinner(squares);

  const handleSquareClick = useCallback(
    (i, computerChoose) => {
      const nextSquares = squares.slice();

      const nextAvailableSquares = availableSquares.filter(
        (square) => square !== i
      );

      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }

      setSquares(nextSquares);
      setXIsNext(!xIsNext);
      setAvailableSquares(nextAvailableSquares);
      setComputerTurn(!computerChoose);
    },
    [availableSquares, squares, xIsNext]
  );

  function getRandomSquare(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }

  useEffect(() => {
    if (computerTurn) {
      setTimeout(() => {
        const randomIndex = getRandomSquare(availableSquares);
        handleSquareClick(randomIndex, true);
      }, 1200);
    }
  }, [availableSquares, computerTurn, handleSquareClick]);

  function handleChoosePlayerClick(value) {
    setChooseTeam(false);

    if (value === 'O') {
      setXIsNext(false);
      setTeam('O');
    }
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = 'Winner: ' + winner;
    setTimeout(() => {
      handleReset();
    }, 2000);
  } else if (!squares.includes(null)) {
    status = 'Tie Game';
    setTimeout(() => {
      handleReset();
    }, 2000);
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : '0');
  }

  function handleReset() {
    setXIsNext('X');
    setSquares(Array(9).fill(null));
    setChooseTeam(true);
    setTeam('X');
    setAvailableSquares(allSquaresOpen);
    setComputerTurn(false);
    setAvailableSquares(allSquaresOpen);
  }
  return (
    <div className='App'>
      <h1>
        <span className='blueText'>Tic </span>
        <span className='orangeText'>Tac </span>
        <span className='redText'>Toe </span>
      </h1>
      {chooseTeam ? (
        <div>
          <p>Choose your team:</p>
          <button
            type='button'
            className='choosePlayerButton red'
            value='X'
            onClick={() => handleChoosePlayerClick('X')}
          >
            X
          </button>
          <button
            type='button'
            className='choosePlayerButton blue'
            value='O'
            onClick={() => handleChoosePlayerClick('O')}
          >
            O
          </button>
        </div>
      ) : (
        <div className='status'>{status}</div>
      )}

      <div className='gameBoard'>
        {allSquaresOpen.map((square) => (
          <button
            key={square}
            className={
              squares[square] === 'O' ? 'square blueText' : 'square redText'
            }
            disabled={gameDisabled || squares[square !== null]}
            value={squares[square]}
            type='button'
            onClick={() => handleSquareClick(square, false)}
          >
            {squares[square]}
          </button>
        ))}
      </div>
      {!chooseTeam && (
        <div className='assignXorOToPlayer'>
          <h5 className='playerAssignment'>
            You are team {team} vs. Computer {team === 'X' ? 'O' : 'X'}
          </h5>
        </div>
      )}

      <button type='button' className='resetButton' onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default App;

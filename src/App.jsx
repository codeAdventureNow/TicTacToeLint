import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick }) {
  return (
    <button
      className={value === 'O' ? 'square blueText' : 'square redText'}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

const allSquaresOpen = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [chooseTeam, setChooseTeam] = useState(true);
  const [team, setTeam] = useState('X');
  const [computerTurn, setComputerTurn] = useState(false);
  const [availableSquares, setAvailableSquares] = useState(allSquaresOpen);

  function handleSquareClick(i) {
    if (chooseTeam) {
      return;
    }

    if (computerTurn) {
      return;
    }

    if (squares[i] || calculateWinner(squares)) {
      return;
    }
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
    setComputerTurn(true);
  }

  function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }

  function computerChooseSquare() {
    setTimeout(() => {
      const nextSquares = squares.slice();

      let randomIndex = getRandomItem(availableSquares);
      console.log(randomIndex);

      if (calculateWinner(squares)) {
        return;
      }
      const nextAvailableSquares = availableSquares.filter(
        (square) => square !== randomIndex
      );

      if (xIsNext) {
        nextSquares[randomIndex] = 'X';
      } else {
        nextSquares[randomIndex] = 'O';
      }
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
      setAvailableSquares(nextAvailableSquares);
      setComputerTurn(false);
    }, 1200);
  }

  if (computerTurn) {
    computerChooseSquare();
  }

  function handleChoosePlayerClick(value) {
    setChooseTeam(false);

    if (value === 'O') {
      setXIsNext(false);
      setTeam('O');
    }
  }

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
            className='choosePlayerButton red'
            value='X'
            onClick={() => handleChoosePlayerClick('X')}
          >
            X
          </button>
          <button
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
        <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
      </div>
      {!chooseTeam && (
        <div className='assignXorOToPlayer'>
          <h5 className='playerAssignment'>
            You are team {team} vs. Computer {team === 'X' ? 'O' : 'X'}
          </h5>
        </div>
      )}

      <button className='resetButton' onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default App;

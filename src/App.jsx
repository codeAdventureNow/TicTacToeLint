import { useCallback, useState, useEffect } from 'react';
import './App.css';

const allSquaresOpen = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [chooseTeam, setChooseTeam] = useState(true);
  const [team, setTeam] = useState('X');
  const [computerTurn, setComputerTurn] = useState(false);
  const [availableSquares, setAvailableSquares] = useState(allSquaresOpen);
  const [status, setStatus] = useState(`Next player: ${xIsNext ? 'X' : '0'}`);

  const calculateWinner = (square) => {
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
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return squares[a];
      }
    }

    return null;
  };

  console.log('newfactor2');
  const winner = calculateWinner(squares);

  const handleReset = useCallback(() => {
    setComputerTurn(false);
    setXIsNext('X');
    setSquares(Array(9).fill(null));
    setChooseTeam(true);
    setTeam('X');
    setAvailableSquares(allSquaresOpen);
    setStatus(`Next player: ${xIsNext ? 'X' : '0'}`);
  }, [xIsNext]);

  useEffect(() => {
    if (winner || !squares.includes(null)) {
      setStatus(winner ? `Winner: ${winner}` : 'Tie Game');
      setTimeout(() => {
        handleReset();
      }, 2000);
    } else {
      setStatus(`Next player: ${xIsNext ? 'X' : '0'}`);
    }
  }, [winner, xIsNext, squares, status, handleReset]);

  const handleSquareClick = useCallback(
    (i, computerChoose) => {
      const nextSquares = [...squares];

      const nextAvailableSquares = availableSquares.filter(
        (square) => square !== i
      );

      nextSquares[i] = xIsNext ? 'X' : 'O';

      setSquares(nextSquares);
      setXIsNext(!xIsNext);
      setAvailableSquares(nextAvailableSquares);
      setComputerTurn(!computerChoose);
    },
    [availableSquares, squares, xIsNext]
  );

  const getRandomSquare = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  };

  useEffect(() => {
    if (computerTurn && winner !== null) {
      return;
    }
    if (computerTurn) {
      setTimeout(() => {
        const randomIndex = getRandomSquare(availableSquares);
        handleSquareClick(randomIndex, true);
      }, 1200);
    }
  }, [availableSquares, computerTurn, handleSquareClick, winner]);

  const handleChoosePlayerClick = (value) => {
    setChooseTeam(false);

    if (value === 'O') {
      setXIsNext(false);
      setTeam('O');
    }
  };

  return (
    <div className='app-flex'>
      <h1 className='game-title'>
        <span className='blue-text'>Tic </span>
        <span className='orange-text'>Tac </span>
        <span className='red-text'>Toe </span>
      </h1>
      {chooseTeam ? (
        <div>
          <h4 className='heading-choose-team'>Choose your team</h4>
          <button
            className='choose-player-button red'
            type='button'
            value='X'
            onClick={() => handleChoosePlayerClick('X')}
          >
            X
          </button>
          <button
            className='choose-player-button blue'
            type='button'
            value='O'
            onClick={() => handleChoosePlayerClick('O')}
          >
            O
          </button>
        </div>
      ) : (
        <div className='game-status-next-player'>{status}</div>
      )}

      <div className='game-board'>
        {allSquaresOpen.map((square) => {
          const IsSquareDisabled =
            chooseTeam ||
            computerTurn ||
            squares[square] !== null ||
            winner !== null;
          return (
            <button
              className={
                squares[square] === 'O'
                  ? 'game-square blue-text'
                  : 'game-square red-text'
              }
              key={square}
              disabled={IsSquareDisabled}
              value={squares[square]}
              type='button'
              onClick={() => handleSquareClick(square, false)}
            >
              {squares[square]}
            </button>
          );
        })}
      </div>
      {!chooseTeam && (
        <div className='flex-player-assignment'>
          <h5 className='heading-player-assignment'>
            You are team {team} vs. Computer {team === 'X' ? 'O' : 'X'}
          </h5>
        </div>
      )}

      <button className='reset-button' type='button' onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default App;

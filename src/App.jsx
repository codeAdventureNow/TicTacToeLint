import { useCallback, useState, useEffect } from 'react';
import './App.css';

const getRandomSquare = (squareNumbers) => {
  const randomIndex = Math.floor(Math.random() * squareNumbers.length);
  const item = squareNumbers[randomIndex];
  return item;
};

const calculateWinner = (squaresChosen) => {
  const gameWinningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [2, 5, 8],
    [1, 4, 7],
    [0, 3, 6],
  ];
  for (let i = 0; i < gameWinningLines.length; i++) {
    const [a, b, c] = gameWinningLines[i];
    if (
      squaresChosen[a] &&
      squaresChosen[a] === squaresChosen[b] &&
      squaresChosen[a] === squaresChosen[c]
    ) {
      return squaresChosen[a];
    }
  }

  return null;
};

const allSquaresOpen = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function App() {
  const [chooseTeam, setChooseTeam] = useState(true);
  const [team, setTeam] = useState('');
  const [xIsNext, setXIsNext] = useState(true);
  const [computerTurn, setComputerTurn] = useState(false);
  const [boardState, setBoardState] = useState(Array(9).fill(null));
  const [avaialableSquareNumbers, setAvailableSquareNumbers] =
    useState(allSquaresOpen);
  const [gameStatusMessage, setGameStatusMessage] = useState('');

  const winner = calculateWinner(boardState);

  const handleReset = useCallback(() => {
    setTeam('X');
    setComputerTurn(false);
    setXIsNext('X');
    setBoardState(Array(9).fill(null));
    setChooseTeam(true);
    setAvailableSquareNumbers(allSquaresOpen);
    setGameStatusMessage(`Next player: ${xIsNext ? 'X' : '0'}`);
  }, [xIsNext]);

  useEffect(() => {
    if (winner || !boardState.includes(null)) {
      setGameStatusMessage(winner ? `Winner: ${winner}` : 'Tie Game');
      setTimeout(() => {
        handleReset();
      }, 2000);
    } else {
      setGameStatusMessage(`Next player: ${xIsNext ? 'X' : '0'}`);
    }
  }, [winner, xIsNext, boardState, gameStatusMessage, handleReset]);

  const handleSquareClick = useCallback(
    (i, computerChoose) => {
      const nextSquares = [...boardState];

      const nextAvailableSquares = avaialableSquareNumbers.filter(
        (square) => square !== i
      );

      nextSquares[i] = xIsNext ? 'X' : 'O';

      setBoardState(nextSquares);
      setXIsNext(!xIsNext);
      setAvailableSquareNumbers(nextAvailableSquares);
      setComputerTurn(!computerChoose);
    },
    [avaialableSquareNumbers, boardState, xIsNext]
  );

  useEffect(() => {
    if (computerTurn && winner !== null) {
      return;
    }
    if (computerTurn) {
      setTimeout(() => {
        const randomIndex = getRandomSquare(avaialableSquareNumbers);
        handleSquareClick(randomIndex, true);
      }, 1200);
    }
  }, [avaialableSquareNumbers, computerTurn, handleSquareClick, winner]);

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
        <div className='game-status-next-player'>{gameStatusMessage}</div>
      )}

      <div className='game-board'>
        {allSquaresOpen.map((square) => {
          const IsSquareDisabled =
            chooseTeam ||
            computerTurn ||
            boardState[square] !== null ||
            winner !== null;
          return (
            <button
              className={
                boardState[square] === 'O'
                  ? 'game-square blue-text'
                  : 'game-square red-text'
              }
              key={square}
              disabled={IsSquareDisabled}
              value={boardState[square]}
              type='button'
              onClick={() => handleSquareClick(square, false)}
            >
              {boardState[square]}
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

import { useCallback, useState, useEffect, useReducer } from 'react';
import './App.css';

const allSquaresOpen = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const ACTIONS = {
  HANDLE_RESET: 'HANDLE_RESET',
  CHOOSE_TEAM: 'CHOOSE_TEAM',
  HANDLE_TURN: 'HANDLE_TURN',
};

let xIsNext = true;

const initialState = {
  xIsNext: true,
  squares: Array(9).fill(null),
  chooseTeam: true,
  computerTurn: false,
  availableSquares: allSquaresOpen,
  status: `Next player: ${xIsNext ? 'X' : '0'}`,
};

const calculateWinner = (squares) => {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.HANDLE_RESET:
      return initialState;

    case ACTIONS.CHOOSE_TEAM:
      return {
        ...state,
        chooseTeam: false,
        team: action.payload.team,
        xIsNext: action.payload.team === 'X',
      };

    case ACTIONS.HANDLE_TURN: {
      const winner = calculateWinner(state.squares);
      // calculate winner
      // calculate avaiable here

      return {
        ...state,
        xIsNext: !state.xIsNext,
        squares: 'pass through which square got taken', // action.payload.something
        computerTurn: !state.computerTurn,
        availableSquares: 'change here a',
        status: 'will change',
      };
    }

    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [xIsNext, setXIsNext] = useState(true);

  // const [state.squares, setSquares] = useState(Array(9).fill(null));
  // const [state.chooseTeam, setChooseTeam] = useState(true);
  // const [team, setTeam] = useState('X');
  // const [state.state.computerTurn, setComputerTurn] = useState(false);
  // const [state.availableSquares, setAvailableSquares] = useState(allSquaresOpen);
  // const [state.status, setStatus] = useState(`Next player: ${xIsNext ? 'X' : '0'}`);

  // Will calculateWinner live in the app component or the reducer?

  const winner = calculateWinner(state.squares);

  // Will I be using a callback within the reducer to reset the state?
  const handleReset = useCallback(() => {
    dispatch({ type: ACTIONS.HANDLE_RESET });
  }, []);

  // Do my conditionals need to be part of a reducer?
  // If so how will implement a useEffect within a reducer?
  useEffect(() => {
    if (winner || !state.squares.includes(null)) {
      setStatus(winner ? `Winner: ${winner}` : 'Tie Game');
      setTimeout(() => {
        handleReset();
      }, 2000);
    } else {
      setStatus(`Next player: ${xIsNext ? 'X' : '0'}`);
    }
  }, [winner, xIsNext, state.squares, state.status, handleReset]);

  const handleSquareClick = useCallback(
    (i, computerChoose) => {
      const nextSquares = [...state.squares];

      const nextAvailableSquares = state.availableSquares.filter(
        (square) => square !== i
      );

      nextSquares[i] = xIsNext ? 'X' : 'O';

      setSquares(nextSquares);
      setXIsNext(!xIsNext);
      setAvailableSquares(nextAvailableSquares);
      setComputerTurn(!computerChoose);
    },
    [state.availableSquares, state.squares, xIsNext]
  );

  const getRandomSquare = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  };

  useEffect(() => {
    if (state.computerTurn && winner !== null) {
      return;
    }
    if (state.computerTurn) {
      setTimeout(() => {
        const randomIndex = getRandomSquare(state.availableSquares);
        handleSquareClick(randomIndex, true);
      }, 1200);
    }
  }, [state.availableSquares, state.computerTurn, handleSquareClick, winner]);

  const handleChoosePlayerClick = (value) => {
    dispatch({
      type: ACTIONS.CHOOSE_TEAM,
      payload: {
        team: value,
      },
    });
  };

  return (
    <div className='app-flex'>
      <h1 className='game-title'>
        <span className='blue-text'>Tic </span>
        <span className='orange-text'>Tac </span>
        <span className='red-text'>Toe </span>
      </h1>
      {state.chooseTeam ? (
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
        <div className='game-state.status-next-player'>{state.status}</div>
      )}

      <div className='game-board'>
        {allSquaresOpen.map((square) => {
          const IsSquareDisabled =
            state.chooseTeam ||
            state.computerTurn ||
            state.squares[square] !== null ||
            winner !== null;
          return (
            <button
              className={
                state.squares[square] === 'O'
                  ? 'game-square blue-text'
                  : 'game-square red-text'
              }
              key={square}
              disabled={IsSquareDisabled}
              value={state.squares[square]}
              type='button'
              onClick={() => handleSquareClick(square, false)}
            >
              {state.squares[square]}
            </button>
          );
        })}
      </div>
      {!state.chooseTeam && (
        <div className='flex-player-assignment'>
          <h5 className='heading-player-assignment'>
            You are team {team} vs. Computer {team === 'X' ? 'O' : 'X'}
          </h5>
        </div>
      )}

      <button
        className='reset-button'
        type='button'
        // onClick={() => dispatch({ type: ACTIONS.HANDLE_RESET })}
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}

export default App;

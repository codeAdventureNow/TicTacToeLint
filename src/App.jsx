import { useCallback, useEffect, useReducer } from 'react';
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

const ACTIONS = {
  HANDLE_RESET: 'HANDLE_RESET',
  CHOOSE_TEAM: 'CHOOSE_TEAM',
  HANDLE_TURN: 'HANDLE_TURN',
};

const allSquaresOpen = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const intitialState = {
  chooseTeam: true,
  team: '',
  xIsNext: true,
  computerTurn: false,
  boardState: Array(9).fill(null),
  avaialableSquareNumbers: allSquaresOpen,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.HANDLE_RESET:
      return intitialState;
    case ACTIONS.CHOOSE_TEAM:
      return {
        ...state,
        chooseTeam: false,
        team: action.payload.team,
        // will xisNext be set to false if we choose 'O'
        xIsNext: action.payload.team === 'X',
      };
    case ACTIONS.HANDLE_TURN: {
      return {
        ...state,
        boardState: action.payload.boardState,
        xIsNext: !state.xIsNext,
        avaialableSquareNumbers: action.payload.avaialableSquareNumbers,
        computerTurn: action.payload.computerTurn,
      };
    }

    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, intitialState);

  const winner = calculateWinner(state.boardState);

  const statusMessage = () => {
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (!state.boardState.includes(null)) {
      return 'Tie Game';
    }
    return `Next player: ${state.xIsNext ? 'X' : '0'}`;
  };

  const handleChoosePlayerClick = (value) => {
    dispatch({
      type: ACTIONS.CHOOSE_TEAM,
      payload: {
        team: value,
      },
    });
  };

  const handleSquareClick = useCallback(
    (i, computerChoose) => {
      const nextSquares = [...state.boardState];

      const nextAvailableSquares = state.avaialableSquareNumbers.filter(
        (square) => square !== i
      );

      nextSquares[i] = state.xIsNext ? 'X' : 'O';
      dispatch({
        type: ACTIONS.HANDLE_TURN,
        payload: {
          boardState: nextSquares,
          avaialableSquareNumbers: nextAvailableSquares,
          computerTurn: !computerChoose,
        },
      });
    },
    [state.avaialableSquareNumbers, state.boardState, state.xIsNext]
  );

  const handleReset = useCallback(() => {
    dispatch({ type: ACTIONS.HANDLE_RESET });
  }, []);

  useEffect(() => {
    if (winner || !state.boardState.includes(null)) {
      setTimeout(() => {
        handleReset();
      }, 2000);
    }
  }, [winner, state.xIsNext, state.boardState, handleReset]);

  useEffect(() => {
    if (state.computerTurn && winner !== null) {
      return;
    }
    if (state.computerTurn) {
      setTimeout(() => {
        const randomIndex = getRandomSquare(state.avaialableSquareNumbers);
        handleSquareClick(randomIndex, true);
      }, 1200);
    }
  }, [
    state.avaialableSquareNumbers,
    state.computerTurn,
    handleSquareClick,
    winner,
  ]);

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
        <div className='game-status-next-player'>{statusMessage()}</div>
      )}

      <div className='game-board'>
        {allSquaresOpen.map((square) => {
          const IsSquareDisabled =
            state.chooseTeam ||
            state.computerTurn ||
            state.boardState[square] !== null ||
            winner !== null;
          return (
            <button
              className={
                state.boardState[square] === 'O'
                  ? 'game-square blue-text'
                  : 'game-square red-text'
              }
              key={square}
              disabled={IsSquareDisabled}
              value={state.boardState[square]}
              type='button'
              onClick={() => handleSquareClick(square, false)}
            >
              {state.boardState[square]}
            </button>
          );
        })}
      </div>
      {!state.chooseTeam && (
        <div className='flex-player-assignment'>
          <h5 className='heading-player-assignment'>
            You are team {state.team} vs. Computer{' '}
            {state.team === 'X' ? 'O' : 'X'}
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

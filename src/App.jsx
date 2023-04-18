import { useCallback, useEffect, useReducer } from 'react';
import { calculateWinner, getRandomSquare, statusMessage } from './utils';
import { intitialState, reducer, ACTIONS } from './reducer';
import './App.css';

export const allSquaresOpen = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function App() {
  const [state, dispatch] = useReducer(reducer, intitialState);
  const winner = calculateWinner(state.boardState);
  const computerTeam = state.team === 'X' ? 'O' : 'X';

  const handleChoosePlayerClick = (value) => {
    dispatch({
      type: ACTIONS.CHOOSE_TEAM,
      payload: {
        team: value,
      },
    });
  };

  const handleReset = useCallback(() => {
    dispatch({ type: ACTIONS.HANDLE_RESET });
  }, []);

  const handleSquareClick = useCallback((squareIndex, team) => {
    dispatch({
      type: ACTIONS.HANDLE_TURN,
      payload: {
        clickedSquare: squareIndex,
        team,
      },
    });
  }, []);

  const handleComputerTurn = useCallback(() => {
    // boardState = ['X', 'O', null]
    const availableSquareIndices = state.boardState.reduce(
      (acc, curr, index) => {
        if (curr === null) {
          return [...acc, index];
        }
        return acc;
      },
      []
    );

    const randomIndex = getRandomSquare(availableSquareIndices);
    handleSquareClick(randomIndex, computerTeam);
  }, [handleSquareClick, computerTeam, state.boardState]);

  // If there is a winner of tie game, reset the game

  useEffect(() => {
    if (winner || !state.boardState.includes(null)) {
      setTimeout(handleReset, 2000);
    }
  }, [winner, handleReset, state.boardState]);

  // If there is not a winner, because the game is still going and it is
  // the computer turn, then the computer should go

  useEffect(() => {
    if (winner === null && state.computerTurn) {
      setTimeout(handleComputerTurn, 1200);
    }
  }, [handleComputerTurn, state.computerTurn, winner]);

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
        <div className='game-status-next-player'>
          {statusMessage(winner, state.boardState, state.xIsNext)}
        </div>
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
              onClick={() => handleSquareClick(square, state.team)}
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

import { useCallback, useEffect, useReducer } from 'react';
import { getRandomSquare, calculateWinner, statusMessage } from './utils';
import { ACTIONS, allSquaresOpen, intitialState, reducer } from './reducer';

import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, intitialState);

  const winner = calculateWinner(state.boardState);

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

  const handleSquareClick = useCallback(
    (index, computerChoose) => {
      const nextSquares = [...state.boardState];

      const nextAvailableSquares = state.availableSquareNumbers.filter(
        (square) => square !== index
      );

      nextSquares[index] = state.xIsNext ? 'X' : 'O';
      dispatch({
        type: ACTIONS.HANDLE_TURN,
        payload: {
          boardState: nextSquares,
          availableSquareNumbers: nextAvailableSquares,
          computerTurn: !computerChoose,
        },
      });
    },
    [state.availableSquareNumbers, state.boardState, state.xIsNext]
  );

  useEffect(() => {
    if (state.computerTurn && winner !== null) {
      return;
    }
    if (state.computerTurn) {
      setTimeout(() => {
        const randomIndex = getRandomSquare(state.availableSquareNumbers);
        handleSquareClick(randomIndex, true);
      }, 1200);
    }
  }, [
    state.availableSquareNumbers,
    state.computerTurn,
    handleSquareClick,
    winner,
  ]);

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

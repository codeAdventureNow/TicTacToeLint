export const ACTIONS = {
  HANDLE_RESET: 'HANDLE_RESET',
  CHOOSE_TEAM: 'CHOOSE_TEAM',
  HANDLE_TURN: 'HANDLE_TURN',
};

export const allSquaresOpen = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export const intitialState = {
  chooseTeam: true,
  team: '',
  xIsNext: true,
  computerTurn: false,
  boardState: Array(9).fill(null),
  avaialableSquareNumbers: allSquaresOpen,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.HANDLE_RESET:
      return intitialState;
    case ACTIONS.CHOOSE_TEAM:
      // setChooseTeam(false);

      // if (value === 'O') {
      //   setXIsNext(false);
      //   setTeam('O');
      // }
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

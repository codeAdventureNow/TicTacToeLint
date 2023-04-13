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
    case ACTIONS.CHOOSE_TEAM: {
      const { team } = action.payload;
      return {
        ...state,
        chooseTeam: false,
        team,
        // will xisNext be set to false if we choose 'O'
        xIsNext: action.payload.team === 'X',
      };
    }
    case ACTIONS.HANDLE_TURN: {
      const { boardState, avaialableSquareNumbers, computerTurn } =
        action.payload;
      return {
        ...state,
        boardState,
        avaialableSquareNumbers,
        computerTurn,
        xIsNext: !state.xIsNext,
      };
    }

    default:
      throw new Error();
  }
};

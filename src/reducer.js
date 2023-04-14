export const ACTIONS = {
  HANDLE_RESET: 'HANDLE_RESET',
  CHOOSE_TEAM: 'CHOOSE_TEAM',
  HANDLE_TURN: 'HANDLE_TURN',
  NEW_HANDLE_TURN: 'NEW_HANDLE_TURN',
};

export const intitialState = {
  chooseTeam: true,
  team: '',
  xIsNext: true,
  computerTurn: false,
  boardState: Array(9).fill(null),
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
        xIsNext: team === 'X',
      };
    }

    case ACTIONS.NEW_HANDLE_TURN: {
      const updatedBoardState = state.boardState.map((square, index) => {
        if (index === action.payload.clickedSquare) {
          return action.payload.team;
        }
        return square;
      });

      return {
        ...state,
        boardState: updatedBoardState,
        computerTurn: !state.computerTurn,
        xIsNext: !state.xIsNext,
      };
    }

    default:
      throw new Error();
  }
};

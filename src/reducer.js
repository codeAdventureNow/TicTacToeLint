export const ACTIONS = {
  HANDLE_RESET: 'HANDLE_RESET',
  CHOOSE_TEAM: 'CHOOSE_TEAM',
  HANDLE_TURN: 'HANDLE_TURN',
};

// remove xIsNext
// remove chooseTeam state
// extension - add an option for Player 2 to be human
export const intitialState = {
  team: '',
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
        team,
      };
    }

    case ACTIONS.HANDLE_TURN: {
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
      };
    }

    default:
      throw new Error();
  }
};

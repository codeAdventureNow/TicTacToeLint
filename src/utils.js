export const getRandomSquare = (squareNumbers) => {
  const randomIndex = Math.floor(Math.random() * squareNumbers.length);
  const item = squareNumbers[randomIndex];
  return item;
};

export const calculateWinner = (squaresChosen) => {
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

export function statusMessage(winner, boardState, xisNext) {
  if (winner) {
    return `Winner: ${winner}`;
  }
  if (!state.boardState.includes(null)) {
    return 'Tie Game';
  }
  return `Next player: ${state.xIsNext ? 'X' : '0'}`;
}

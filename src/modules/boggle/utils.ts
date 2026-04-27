function createBooleanBoard() {
  return Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => false));
}

export function getValidWordPath(
  board: string[][],
  word: string,
): Array<{ x: number; y: number }> | undefined {
  const alreadyUsed = createBooleanBoard();
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (!board[y][x].toUpperCase().startsWith(word[0])) continue;
      let result = getValidWordPathRecursive(board, word, { x, y }, alreadyUsed);
      if (result) return result;
    }
  }
  return undefined;
}

function getValidWordPathRecursive(
  board: string[][],
  remainingWord: string,
  startingAt: { x: number; y: number },
  alreadyUsed: boolean[][] = createBooleanBoard(),
  pathSoFar: Array<{ x: number; y: number }> = [],
): Array<{ x: number; y: number }> | undefined {
  const { x, y } = startingAt;
  if (alreadyUsed[y][x]) return undefined;
  const dieValue = board[y][x].toUpperCase();
  if (!remainingWord.startsWith(dieValue)) return undefined;

  const newRemainingWord = remainingWord.slice(dieValue.length);
  pathSoFar.push(startingAt);
  alreadyUsed[y][x] = true;

  if (newRemainingWord.length === 0) return pathSoFar;
  for (let dy = -1; dy <= 1; dy++) {
    const newY = y + dy;
    if (newY < 0 || newY >= 4) continue;
    for (let dx = -1; dx <= 1; dx++) {
      const newX = x + dx;
      if (newX < 0 || newX >= 4) continue;
      if (dx === 0 && dy === 0) continue;

      const result = getValidWordPathRecursive(
        board,
        newRemainingWord,
        { x: newX, y: newY },
        alreadyUsed,
        pathSoFar,
      );
      if (result) return result;
    }
  }
  pathSoFar.pop();
  alreadyUsed[y][x] = false;

  return undefined;
}

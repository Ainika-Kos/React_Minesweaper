import { MAX_ROWS, MAX_COLS, BOMBS } from '../constants/constants';
import { CellValue, CellState, Cell } from '../types/types';

export const generateCells = (): Cell[][] => {
  let cells: Cell[][] = [];

  // generate all body cells

  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.open,
      });
    }
  }

  // generate 10 randomly bombs

  let bombsPlaced = 0;

  while (bombsPlaced < BOMBS) {
    const randomRow = Math.floor(Math.random() * MAX_ROWS);
    const randomCol = Math.floor(Math.random() * MAX_COLS);

    const currentCell = cells[randomRow][randomCol];

    if (currentCell.value !== CellValue.bomb) {
      cells = cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (randomRow === rowIndex && randomCol === colIndex) {
            return {
              ...cell,
              value: CellValue.bomb,
            };
          }
          return cell;
        })
      );
      bombsPlaced += 1;
    }
  }

  // calculate the numbers for each cell

  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < MAX_COLS; colIndex++) {
      const currentCell = cells[rowIndex][colIndex];
      if (currentCell.value !== CellValue.bomb) {
        let numberOfBombs = 0;

        const topLeftBomb = rowIndex > 0 && colIndex > 0 ? cells[rowIndex - 1][colIndex - 1] : null;
        const topBumb = rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null;
        const topRightBomb =
          rowIndex > 0 && colIndex < MAX_COLS - 1 ? cells[rowIndex - 1][colIndex + 1] : null;
        const leftBomb = colIndex > 0 ? cells[rowIndex][colIndex - 1] : null;
        const rightBomb = colIndex < MAX_COLS - 1 ? cells[rowIndex][colIndex + 1] : null;
        const buttomLeftBomb =
          rowIndex < MAX_ROWS - 1 && colIndex > 0 ? cells[rowIndex + 1][colIndex - 1] : null;
        const buttomBomb = rowIndex < MAX_ROWS - 1 ? cells[rowIndex + 1][colIndex] : null;
        const buttomRightBomb =
          rowIndex < MAX_ROWS - 1 && colIndex < MAX_COLS - 1
            ? cells[rowIndex + 1][colIndex + 1]
            : null;

        if (topLeftBomb?.value === CellValue.bomb) {
          // topLeftBomb  && topLeftBomb.value
          numberOfBombs += 1;
        }
        if (topBumb?.value === CellValue.bomb) {
          numberOfBombs += 1;
        }
        if (topRightBomb?.value === CellValue.bomb) {
          numberOfBombs += 1;
        }
        if (leftBomb?.value === CellValue.bomb) {
          numberOfBombs += 1;
        }
        if (rightBomb?.value === CellValue.bomb) {
          numberOfBombs += 1;
        }
        if (buttomLeftBomb?.value === CellValue.bomb) {
          numberOfBombs += 1;
        }
        if (buttomBomb?.value === CellValue.bomb) {
          numberOfBombs += 1;
        }
        if (buttomRightBomb?.value === CellValue.bomb) {
          numberOfBombs += 1;
        }

        if (numberOfBombs > 0) {
          cells[rowIndex][colIndex] = {
            ...currentCell,
            value: numberOfBombs,
          };
        }
      }
    }
  }

  return cells;
};

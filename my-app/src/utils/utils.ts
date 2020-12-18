import { MAX_ROWS, MAX_COLS, BOMBS } from '../constants/constants';
import { CellValue, CellState, Cell } from '../types/types';

const grabAllAdjacentCells = (
  cells: Cell[][],
  rowParam: number,
  colParam: number
): {
  topLeftCell: Cell | null;
  topCell: Cell | null;
  topRightCell: Cell | null;
  leftCell: Cell | null;
  rightCell: Cell | null;
  buttomLeftCell: Cell | null;
  buttomCell: Cell | null;
  buttomRightCell: Cell | null;
} => {
  const topLeftCell = rowParam > 0 && colParam > 0 ? cells[rowParam - 1][colParam - 1] : null;
  const topCell = rowParam > 0 ? cells[rowParam - 1][colParam] : null;
  const topRightCell =
    rowParam > 0 && colParam < MAX_COLS - 1 ? cells[rowParam - 1][colParam + 1] : null;
  const leftCell = colParam > 0 ? cells[rowParam][colParam - 1] : null;
  const rightCell = colParam < MAX_COLS - 1 ? cells[rowParam][colParam + 1] : null;
  const buttomLeftCell =
    rowParam < MAX_ROWS - 1 && colParam > 0 ? cells[rowParam + 1][colParam - 1] : null;
  const buttomCell = rowParam < MAX_ROWS - 1 ? cells[rowParam + 1][colParam] : null;
  const buttomRightCell =
    rowParam < MAX_ROWS - 1 && colParam < MAX_COLS - 1 ? cells[rowParam + 1][colParam + 1] : null;

  return {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    buttomLeftCell,
    buttomCell,
    buttomRightCell,
  };
};

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

        const {
          topLeftCell,
          topCell,
          topRightCell,
          leftCell,
          rightCell,
          buttomLeftCell,
          buttomCell,
          buttomRightCell,
        } = grabAllAdjacentCells(cells, rowIndex, colIndex);

        if (topLeftCell?.value === CellValue.bomb) {
          // topLeftCell  && topLeftCell.value
          numberOfBombs += 1;
        }
        if (topCell?.value === CellValue.bomb) {
          numberOfBombs += 1;
        }
        if (topRightCell?.value === CellValue.bomb) {
          numberOfBombs += 1;
        }
        if (leftCell?.value === CellValue.bomb) {
          numberOfBombs += 1;
        }
        if (rightCell?.value === CellValue.bomb) {
          numberOfBombs += 1;
        }
        if (buttomLeftCell?.value === CellValue.bomb) {
          numberOfBombs += 1;
        }
        if (buttomCell?.value === CellValue.bomb) {
          numberOfBombs += 1;
        }
        if (buttomRightCell?.value === CellValue.bomb) {
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

export const openMultipleCells = (
  cells: Cell[][],
  rowParam: number,
  colParam: number
): Cell[][] => {

  const currentCell = cells[rowParam][colParam];

  if (
    currentCell.state === CellState.visible ||
    currentCell.state === CellState.flagged
  ) {
    return cells;
  }

  let newCells = cells.slice();
  newCells[rowParam][colParam].state = CellState.visible;

  const {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    buttomLeftCell,
    buttomCell,
    buttomRightCell,
  } = grabAllAdjacentCells(cells, rowParam, colParam);

  if (topLeftCell?.state === CellState.open && topLeftCell.value !== CellValue.bomb) {
    if (topLeftCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam - 1, colParam - 1);
    } else {
      newCells[rowParam - 1][colParam - 1].state = CellState.visible;
    } 
  }
  if (topCell?.state === CellState.open && topCell.value !== CellValue.bomb) {
    if (topCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam - 1, colParam);
    } else {
      newCells[rowParam - 1][colParam].state = CellState.visible;
    } 
  }
  if (topRightCell?.state === CellState.open && topRightCell.value !== CellValue.bomb) {
    if (topRightCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam - 1, colParam + 1);
    } else {
      newCells[rowParam - 1][colParam + 1].state = CellState.visible;
    } 
  }
  if (leftCell?.state === CellState.open && leftCell.value !== CellValue.bomb) {
    if (leftCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam - 1);
    } else {
      newCells[rowParam][colParam - 1].state = CellState.visible;
    } 
  }
  if (rightCell?.state === CellState.open && rightCell.value !== CellValue.bomb) {
    if (rightCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam + 1);
    } else {
      newCells[rowParam][colParam + 1].state = CellState.visible;
    } 
  }
  if (buttomLeftCell?.state === CellState.open && buttomLeftCell.value !== CellValue.bomb) {
    if (buttomLeftCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam + 1, colParam - 1);
    } else {
      newCells[rowParam + 1][colParam - 1].state = CellState.visible;
    } 
  }
  if (buttomCell?.state === CellState.open && buttomCell.value !== CellValue.bomb) {
    if (buttomCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam + 1, colParam);
    } else {
      newCells[rowParam + 1][colParam].state = CellState.visible;
    } 
  }
  if (buttomRightCell?.state === CellState.open && buttomRightCell.value !== CellValue.bomb) {
    if (buttomRightCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam + 1, colParam + 1);
    } else {
      newCells[rowParam + 1][colParam + 1].state = CellState.visible;
    } 
  }

  return newCells;
};

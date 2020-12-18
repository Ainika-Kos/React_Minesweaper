/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';
import NumberDisplay from '../NumberDisplay/NumberDisplay';
import { generateCells, openMultipleCells } from '../../utils/utils';
import { Button } from '../Button/Button';
import { Cell, CellState, CellValue, Face } from '../../types/types';
import { MAX_COLS, MAX_ROWS } from '../../constants/constants';

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState(10);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseDown = (): void => {
      setFace(Face.oh);
    };

    // const handleMouseUp = (): void => {
    //   setFace(Face.smile);
    // };

    window.addEventListener('mousedown', handleMouseDown);
    // window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      // window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  useEffect(() => {
    if (hasLost) {
      setLive(false);
      setFace(Face.lost);
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      setLive(false);
      setFace(Face.won);
    }
  }, [hasWon]);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    let newCells = cells.slice();

    if (!live) {
      let isABomb = newCells[rowParam][colParam].value === CellValue.bomb;
      while (isABomb) {
        newCells = generateCells();
        if (newCells[rowParam][colParam].value !== CellValue.bomb) {
          isABomb = false;
          break;
        }
      }

      setLive(true);
    }

    let currentCell = newCells[rowParam][colParam];

    if (currentCell.state === CellState.flagged || currentCell.state === CellState.visible) {
      return;
    }

    if (currentCell.value === CellValue.bomb) {
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs();
      setCells(newCells);
    } else if (currentCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam);
    } else {
      newCells[rowParam][colParam].state = CellState.visible;
    }

    // Check to see iw won

    let safeOpenCellsExists = false;

    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        currentCell = newCells[row][col];

        if (currentCell.value !== CellValue.bomb && currentCell.state === CellState.open) {
          safeOpenCellsExists = true;
          break;
        }
      }
    }

    if (!safeOpenCellsExists) {
      newCells.map((row) =>
        row.map((cell) => {
          if (cell.value === CellValue.bomb) {
            return {
              ...cell,
              state: CellState.flagged,
            };
          }
          return cell;
        })
      );

      setHasWon(true);
    }

    setCells(newCells);
  };

  const handleCellContext = (rowParam: number, colParam: number) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault();

    if (!live) {
      return;
    }

    const currentCellClone = cells.slice();
    const currentCell = cells[rowParam][colParam];

    if (currentCell.state === CellState.visible) {
      return;
    }
    if (currentCell.state === CellState.open) {
      currentCellClone[rowParam][colParam].state = CellState.flagged;
      setCells(currentCellClone);
      if (bombCounter > -99) {
        setBombCounter(bombCounter - 1);
      }
    } else if (currentCell.state === CellState.flagged) {
      currentCellClone[rowParam][colParam].state = CellState.open;
      setCells(currentCellClone);
      setBombCounter(bombCounter + 1);
    }
  };

  const handleFaceClick = (): void => {
    setLive(false);
    setTime(0);
    setCells(generateCells());
    setHasLost(false);
    setHasWon(false);
    setBombCounter(10);
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={uuidv4()}
          row={rowIndex}
          col={colIndex}
          state={cell.state}
          value={cell.value}
          onClick={handleCellClick}
          onContext={handleCellContext}
          red={cell.red}
        />
      ))
    );
  };

  const showAllBombs = (): Cell[][] => {
    const currentCell = cells.slice();
    return currentCell.map((row) =>
      row.map((cell) => {
        if (cell.value === CellValue.bomb) {
          return {
            ...cell,
            state: CellState.visible,
          };
        }

        return cell;
      })
    );
  };

  const handleKeyDown = () => {};

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={bombCounter} />
        <div
          className="Face"
          onClick={handleFaceClick}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <span role="img" aria-label="emojy-stars">
            {face}
          </span>
        </div>
        <NumberDisplay value={time} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;

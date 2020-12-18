import React, { useState, useEffect } from 'react';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';
import NumberDisplay from '../NumberDisplay/NumberDisplay';
import { generateCells, openMultipleCells } from '../../utils/utils';
import { Button } from '../Button/Button';
import { Cell, CellState, CellValue, Face } from '../../types/types';
import { MAX_COLS, MAX_ROWS } from '../../constants/constants';
import { Text } from '../Text/Text';

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState(10);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [timeResult, setTimeResult] = useState<number>(0);


  // On every mouse down/up change face - It doesn't work normally!!

  // useEffect(() => {
  //   const handleMouseDown = (): void => {
  //     setFace(Face.oh);
  //   };

  //   // const handleMouseUp = (): void => {
  //   //   setFace(Face.smile);
  //   // };

  //   window.addEventListener('mousedown', handleMouseDown);
  //   // window.addEventListener('mouseup', handleMouseUp);

  //   return () => {
  //     window.removeEventListener('mousedown', handleMouseDown);
  //     // window.removeEventListener('mouseup', handleMouseUp);
  //   };
  // }, [live]);

  // add time in the start (live) till hasWon/hasLost, after clear

  useEffect(() => {
    if (live && time < 999 && !hasLost && !hasWon) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time, hasLost, hasWon]);

  useEffect(() => {
    if (hasLost) {
      setLive(false);
      setFace(Face.lost);
      setTimeResult(time);
    }

    return () => {
      setFace(Face.smile);
    };
  }, [hasLost, time]);

  useEffect(() => {
    if (hasWon) {
      setLive(false);
      setFace(Face.won);
      setTimeResult(time);
    }
  }, [hasWon, time]);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    let newCells = cells.slice();

    // start the game, if in the beginning of game on click is bomb, generate new cells till 1 click is not a bomb

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

    // if currentCell state is flagged or visible

    if ([CellState.flagged, CellState.visible].includes(currentCell.state) || hasLost || hasWon) {
      return;
    }

    // if currentCell value is bomb -> hasLost and red property and show all other bombs, if is none  -> open multiple cells
    if (currentCell.value === CellValue.bomb) {
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs();
      setCells(newCells);
      return;
    } else if (currentCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam);
    } else {
      newCells[rowParam][colParam].state = CellState.visible;
    }

    // Check to see if you have won
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
      newCells = newCells.map((row) =>
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

    if (!live || hasLost || hasWon) {
      return;
    }

    const currentCells = cells.slice();
    const currentCell = cells[rowParam][colParam];

    if (currentCell.state === CellState.visible) {
      return;
    } else if (currentCell.state === CellState.open) {
      currentCells[rowParam][colParam].state = CellState.flagged;
      setCells(currentCells);
      setBombCounter(bombCounter - 1);
    } else if (currentCell.state === CellState.flagged) {
      currentCells[rowParam][colParam].state = CellState.open;
      setCells(currentCells);
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
          col={colIndex}
          key={uuidv4()}
          onClick={handleCellClick}
          onContext={handleCellContext}
          red={cell.red}
          row={rowIndex}
          state={cell.state}
          value={cell.value}
        />
      ))
    );
  };

  const showAllBombs = (): Cell[][] => {
    const currentCells = cells.slice();
    return currentCells.map((row) =>
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

  

  return (
    <div>
      <div className="App">
        <div className="Header">
          <NumberDisplay value={bombCounter} />
          <div
            className="Face"
            onClick={handleFaceClick}
            role="button"
            tabIndex={0}
            onKeyDown={handleFaceClick}
          >
            <span role="img" aria-label="face">
              {face}
            </span>
          </div>
          <NumberDisplay value={time} />
        </div>
        <div className="Body">{renderCells()}</div>
      </div>
      {hasWon && (
        <Text
          text="You won"
          time={timeResult}
          hasWon={hasWon}
        />
      )}
      {hasLost && (
        <Text
          text="You lost"
          time={timeResult}
          hasLost={hasLost}
        />
      )}
    </div>
  );
};

export default App;

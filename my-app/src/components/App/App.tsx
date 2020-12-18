/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';
import NumberDisplay from '../NumberDisplay/NumberDisplay';
import { generateCells } from '../../utils/utils';
import { Button } from '../Button/Button';
import { Cell, CellState, Face } from '../../types/types';

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState(10);

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

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    if (!live) {
      setLive(true);
    }
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
        />
      ))
    );
  };

  const handleFaceClick = (): void => {
    if (live) {
      setLive(false);
      setTime(0);
      setCells(generateCells());
    }
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

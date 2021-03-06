import React from 'react';
import { CellState, CellValue } from '../../types/types';
import './Button.scss';

interface ButtonProps {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
  onClick(rowParam: number, colParam: number): (...args: any[]) => void;
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
  red?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  row, col, state, onContext, value, onClick, red }) => {
  const renderContent = (): React.ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      } 
      if (value === CellValue.none) {
        return null;
      }

      return value;

    } if (state === CellState.flagged) {
      return (
        <span role="img" aria-label="flag">
          🚩
        </span>
      );
    }

    return null;
  };

  return (
    <div
      role="button"
      className={`Button ${state === CellState.visible ? 'visible' : ''} value-${value} ${red ? 'red' : ''}`}
      onClick={onClick(row, col)}
      tabIndex={0}
      onKeyDown={onClick(row, col)}
      onContextMenu={onContext(row, col)}
    >
      {renderContent()}
    </div>
  );
};

import React from 'react';
import { CellState, CellValue } from '../../types/types';
import './Button.scss';

interface ButtonProps {
  disabled: boolean;
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
  onClick(rowParam: number, colParam: number): (...args: any[]) => void;
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
  red?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  row, col, state, onContext, value, onClick, red, disabled }) => {
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

  const handleKeyDown = () => {
    
  };

  return (
    <div
      className={`Button ${state === CellState.visible ? 'visible' : ''} value-${value} ${red ? 'red' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={onClick(row, col)}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onContextMenu={onContext(row, col)}
    >
      {renderContent()}
    </div>
  );
};

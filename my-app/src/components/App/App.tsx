import React, { useState } from 'react';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';
import NumberDisplay from '../NumberDisplay/NumberDisplay';
import { generateCells } from '../../utils/utils';
import { Button } from '../Button/Button';

const App: React.FC = () => {
  const [cells, setCells] = useState(generateCells());

  console.log(cells); // checking cells

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => <Button
        key={uuidv4()}
        row={rowIndex}
        col={colIndex}
        state={cell.state}
        value={cell.value}
      />)
    );
  };

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={0} />
        <div className="Face">
          <span role="img" aria-label="emojy-stars">
            🤩
          </span>
        </div>
        <NumberDisplay value={23} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';
import NumberDisplay from '../NumberDisplay';
import { generateCells } from '../../utils/index';
import { Button } from '../Button/index';

const App: React.FC = () => {
  const [cells, setCells] = useState(generateCells());

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => <Button key={uuidv4()} />)
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

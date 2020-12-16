import React from 'react';
import './App.scss';
import NumberDisplay from '../NumberDisplay';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={0} />
        <div className="Face">
          <span role="img" aria-label="emojy-stars">🤩</span>
        </div>
        <NumberDisplay value={23} />
      </div>
      <div className="Body">Body</div>
    </div>
  );
};

export default App;
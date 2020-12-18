import React from 'react';
import './Text.scss';

interface TextProps {
  text: string;
  time: number;
  hasWon?: boolean;
  hasLost?: boolean;
}

export const Text: React.FC<TextProps> = ({ text, time, hasLost, hasWon }) => {
  return (
    <div className={`Text ${hasWon ? 'green' : ''} ${hasLost ? 'red' : ''}`}>
      <h3>
        {text} in {time} sec
      </h3>
      <p>To restart press the Emoji button</p>
    </div>
  );
};

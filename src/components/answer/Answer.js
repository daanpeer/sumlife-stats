import React from 'react';
import { answerColors, emoji, getMonth } from '../../helpers';

export default ({ isOpen, answer: { answer, date }, onOpenAnswer, onCloseAnswer }) => {
  return (
    <div
      onClick={() => (!isOpen ? onOpenAnswer() : onCloseAnswer())}
      style={{ backgroundColor: answerColors[answer || -1] }}
      className={`answer`}
    >
      <div className={`emoji`}>{emoji[answer || -1]}</div>
      <div
        style={{ backgroundColor: answerColors[answer || -1] }}
        className={`emoji-detail ${isOpen ? 'emoji-detail-open' : ''}`}
      >
        <div className="emoji">{emoji[answer || -1]}</div>
        <div className="date">{getMonth(date)}</div>
      </div>
    </div>
  );
};

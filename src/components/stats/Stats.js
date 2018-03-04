import React from "react";
import { emoji } from "../../helpers";
import state, {
  getAverageAnswers,
  getTotalAnswers,
  progress
} from "../../store";

export default () => (
  <div className="stats">
    <div className="stat">
      <div className="key">Average</div>
      <div className="value">{emoji[getAverageAnswers(state)]}</div>
    </div>
    <div className="stat">
      <div className="key">Answers</div>
      <div className="value">{getTotalAnswers(state)}</div>
    </div>
    <div className="stat">
      <div className="key">Progress</div>
      <div className="value">{progress()}%</div>
    </div>
  </div>
);

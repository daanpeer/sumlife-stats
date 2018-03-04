import React from "react";
import state, { selectQuestion } from "../../store";

export default () => (
  <select onChange={e => selectQuestion(e.target.value)}>
    {state.questions.map((question, index) => (
      <option key={index} value={question}>
        {question}
      </option>
    ))}
  </select>
);

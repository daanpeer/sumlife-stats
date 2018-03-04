import React from "react";
import { selectYear } from "../../questionsStore";
import state, { getSelectedQuestion } from "../../questionsStore";

export default () => {
  const { years } = getSelectedQuestion(state);
  return (
    <select
      value={state.selectedYear}
      onChange={e => selectYear(e.target.value)}
    >
      {years.map((year, index) => (
        <option key={index} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

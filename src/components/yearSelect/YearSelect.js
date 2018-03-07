import React from 'react';
import { selectYear } from '../../store';
import state, { getSelectedQuestion } from '../../store';

export default () => {
  const { years } = getSelectedQuestion(state);
  return (
    <select value={state.selectedYear} onChange={e => selectYear(e.target.value)}>
      {years.map((year, index) => (
        <option key={index} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

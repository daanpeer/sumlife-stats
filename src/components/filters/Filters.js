import React from 'react';
import QuestionSelect from '../questionSelect';
import YearSelect from '../yearSelect';
import state, { toggleFilterEmptyDays } from '../../store';

export default () => (
  <div className="filters">
    <p>Show the question</p>
    <QuestionSelect />
    <p>from the year </p>
    {state.selectedQuestion && <YearSelect />}
    <p>Show empty days? </p>
    <input
      type="checkbox"
      defaultChecked={state.filters.emptyDays}
      onClick={toggleFilterEmptyDays}
    />
  </div>
);

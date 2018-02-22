import React, { Component } from 'react';
import {
  state as questionsStore,
  selectQuestion,
  getSelectedQuestion,
  selectYear,
  getDailyAnswers,
  fetchQuestions,
  toggleFilterEmptyDays,
} from './questionsStore';
import getUrlParms from './helpers/getUrlParams';
import { withStore } from './withStore';
import './App.css';

const answerColors = [
  '#0be881',
  '#05c46b',
  '#ffd32a',
  '#ffa801',
  '#ff3f34',
]

const emoji = {
  '-1': ' 🤷‍♀️',
  '0': '😭',
  '1': '😞',
  '2': '😕',
  '3': '😐',
  '4': '🙂',
  '5': '😄'
}

const AnswersPerDay = () => {
  const answers = getDailyAnswers(questionsStore);

  return (
    <div className="grid">
      {Object.keys(answers).map((day, index) => {
        const answer = answers[day];
        return (
          <div style={{ backgroundColor: answerColors[answer] || '#4bcffa' }} key={index}>
            {emoji[answer || -1]}
          </div>
        );
      })}
    </div>
  )
}

const YearSelect = () => {
  const {
    years,
  } = getSelectedQuestion(questionsStore);

  return (
    <select onChange={(e) => selectYear(e.target.value)}>
      {years.map((year, index) =>
        <option
          key={index}
          value={year}
        >
          {year}
        </option>
      )}
    </select>
  )
}

const QuestionSelect = () => (
  <select onChange={(e) => selectQuestion(e.target.value)}>
    {questionsStore.questions.map((question, index) => <option key={index} value={question}>{question}</option>)}
  </select>
);

const Filters = () => (
  <div className="filter">
    <p>Question: </p>
    <QuestionSelect />
    <p>Year: </p>
    {questionsStore.selectedQuestion && <YearSelect />}
    <p>Show empty days: </p>
    <input type="checkbox" onClick={toggleFilterEmptyDays} />
  </div>
)

class App extends Component {
  componentDidMount() {
    const { token } = getUrlParms(window.location.search);
    if (token) {
      fetchQuestions(token);
    }
  }

  render() {
    const {
      loading,
      selectedYear,
      error,
    } = questionsStore;

    if (error) {
      return 'error..';
    }

    if (loading) {
      return 'loading..';
    }

    return (
      <div className="container">
        <h1>Welcome</h1>
        <Filters />
        {selectedYear && (
          <AnswersPerDay />
        )}
      </div>
    );
  }
}

export default withStore(App, questionsStore);

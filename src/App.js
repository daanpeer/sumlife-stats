import React, {Component} from 'react';
import {
  state as questionsStore,
  selectQuestion,
  getSelectedQuestion,
  selectYear,
  getDailyAnswers,
  fetchQuestions,
  toggleFilterEmptyDays, getAverageAnswers, getTotalAnswers, progress,
} from './questionsStore';
import getUrlParams from './helpers/getUrlParams';
import {withStore} from './withStore';
import './App.css';

const answerColors = {
  '-1': '#4bcffa',
  '1': '#ff3f34',
  '2': '#ffa801',
  '3': '#ffd32a',
  '4': '#05c46b',
  '5': '#0be881',
};

const emoji = {
  '-1': ' 🤷‍♀️',
  '0': '😭',
  '1': '😞',
  '2': '😕',
  '3': '😐',
  '4': '🙂',
  '5': '😄'
};

const getMonth = date => Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
  }).format((new Date(date)));

const Answer = ({ isOpen, answer: { answer, date }, onOpenAnswer, onCloseAnswer }) => {
  return (
    <div
      onClick={() => isOpen ? onOpenAnswer : onCloseAnswer}
      style={{backgroundColor: answerColors[answer || -1]}}
      className={`${isOpen ? 'open' : ''} answer`}
    >
      <div className={`emoji ${isOpen ? 'emoji-open' : ''}`}>{emoji[answer || -1]}</div>
      <div className="meta">
        {getMonth(date)}
      </div>
    </div>
  );
};

class AnswersPerDay extends Component {
  constructor(props)  {
    super(props);
    this.state = {};
  }
  
  render() {
    const answers = getDailyAnswers(questionsStore);
    return (
      <div className="grid">
        {Object.keys(answers).map((day, index) => {
          return (
            <Answer
              isOpen={this.state.open === day}
              onOpenAnswer={() => {
                this.setState(() => ({
                  open: day,
                }))
              }}
              key={index}
              answer={answers[day]}
            />
          );
        })}
      </div>
    );
  }
}

const YearSelect = () => {
  const {
    years,
  } = getSelectedQuestion(questionsStore);
  return (
    <select value={questionsStore.selectedYear} onChange={(e) => selectYear(e.target.value)}>
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
};

const QuestionSelect = () => (
  <select onChange={(e) => selectQuestion(e.target.value)}>
    {questionsStore.questions.map((question, index) =>
      <option key={index} value={question}>{question}</option>)}
  </select>
);

const Filters = () => (
  <div className="filter">
    <p>Question: </p>
    <QuestionSelect/>
    <p>Year: </p>
    {questionsStore.selectedQuestion && <YearSelect/>}
    <p>Show empty days: </p>
    <input type="checkbox" defaultChecked={questionsStore.filters.emptyDays} onClick={toggleFilterEmptyDays}/>
  </div>
);

const Stats = () => (
  <div className="stats">
    <div className="stat">
      <div className="key">Average</div>
      <div className="value">{emoji[getAverageAnswers(questionsStore)]}</div>
    </div>
    <div className="stat">
      <div className="key">Answers</div>
      <div className="value">{getTotalAnswers(questionsStore)}</div>
    </div>
    <div className="stat">
      <div className="key">Progress</div>
      <div className="value">{progress()}%</div>
    </div>
  </div>
);

class App extends Component {
  componentDidMount() {
    const {token} = getUrlParams(window.location.search);
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
        <Stats/>
        <Filters/>
        {selectedYear && (
          <AnswersPerDay/>
        )}
      </div>
    );
  }
}

export default withStore(App, questionsStore);

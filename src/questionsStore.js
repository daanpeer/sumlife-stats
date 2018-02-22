import { observable } from './observe';
import { getDayOfYear } from './helpers/getDayOfYear';

export const state = observable({
  loading: true,
  error: false,
  filteredQuestions: {},
  questions: [],
  selectedQuestion: null,
  selectedYear: null,
  years: [],
});

export const getSelectedQuestion = ({
  filteredQuestions,
  selectedQuestion,
}) => filteredQuestions[selectedQuestion];

export const getAnswersPerYear = (answers) => answers.reduce((acc, answer) => {
  const year = new Date(answer.date).getFullYear();
  return {
    ...acc,
    [year]: [
      ...acc[year] || [],
      answer,
    ]
  };
}, {})

export const getAnswersOfYear = (state) => {
  const {
    filteredQuestions,
    selectedQuestion,
    selectedYear,
  } = state;

  return filteredQuestions[selectedQuestion].answers.filter(({ date }) => {
    return new Date(date).getFullYear() === parseInt(selectedYear, 10);
  })
}

export const getYears = (state) => {
  const years = [];
  const {
    filteredQuestions,
    selectedQuestion,
  } = state;

  filteredQuestions[selectedQuestion].answers.forEach(({ date }) => {
    const year = new Date(date).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
  });

  return years;
}

export const getDailyAnswers = (state) => {
  const answersPerYear = getAnswersOfYear(state)
  const answersPerDay = answersPerYear.reduce((acc, { answer, date }) => {
    return {
      ...acc,
      [getDayOfYear(new Date(date))]: answer,
    }
  }, {})

  return Array.from({ length: 364 }).reduce((acc, _, index) => {
    const day = index + 1
    return {
      ...acc,
      [day]: answersPerDay[day] ? answersPerDay[day] : null,
    }
  }, {})
}

export const selectQuestion = question =>state.selectedQuestion = question
export const selectFirstQuestion = () => state.selectedQuestion = state.questions[0];
export const selectFirstYear = () => state.selectedYear = getSelectedQuestion(state).years[0];
export const selectYear = year => state.selectedYear = year;

export const filterAnswers = () => {
  state.questions.forEach(({ question, answers }) => {
    const answersPerYear = getAnswersPerYear(answers);
    state.filteredQuestions = {
      ...state.filteredQuestions,
      [question]: {
        years: Object.keys(answersPerYear),
        answers,
      }
    }
  });

  state.questions = Object.keys(state.filteredQuestions);
  selectFirstQuestion();
  state.years = getYears(state);
  selectFirstYear();
}

export const fetchQuestions = (token) => {
  state.loading = true;
  return fetch(`${process.env.REACT_APP_API_URL}${token}`)
    .then(response => response.json())
    .catch(err => {
      state.error = true;
    })
    .then(questions => {
      state.questions = questions;
      filterAnswers();
      state.loading = false;
    })
}

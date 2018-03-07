import { getDayOfYear, observable } from '../helpers';

const state = observable({
  loading: true,
  error: false,
  filteredQuestions: {},
  questions: [],
  selectedQuestion: null,
  selectedYear: null,
  years: [],
  filters: {
    emptyDays: true,
  },
});

export const getSelectedQuestion = ({ filteredQuestions, selectedQuestion }) =>
  filteredQuestions[selectedQuestion];

export const getAnswersPerYear = answers =>
  answers.reduce((acc, answer) => {
    const year = new Date(answer.date).getFullYear();
    return {
      ...acc,
      [year]: [...(acc[year] || []), answer],
    };
  }, {});

export const getAnswersOfYear = state => {
  const { filteredQuestions, selectedQuestion, selectedYear } = state;

  return filteredQuestions[selectedQuestion].answers.filter(({ date }) => {
    return new Date(date).getFullYear() === parseInt(selectedYear, 10);
  });
};

export const getYears = state => {
  const years = [];
  const { filteredQuestions, selectedQuestion } = state;

  filteredQuestions[selectedQuestion].answers.forEach(({ date }) => {
    const year = new Date(date).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
  });

  return years;
};

export const getAnswersPerDay = state => {
  const answersPerYear = getAnswersOfYear(state);
  return answersPerYear.reduce((acc, { answer, date }) => {
    return {
      ...acc,
      [getDayOfYear(new Date(date))]: {
        answer,
        date,
      },
    };
  }, {});
};

export const getDailyAnswers = state => {
  const answersPerDay = getAnswersPerDay(state);
  return Array.from({ length: 365 }).reduce((acc, _, index) => {
    const day = index + 1;
    if (!state.filters.emptyDays && !answersPerDay[day]) {
      return acc;
    }

    let answer;
    if (!answersPerDay[day]) {
      answer = {
        date: new Date(state.selectedYear, 0, day).toString(),
        answer: null,
      };
    } else {
      answer = answersPerDay[day];
    }

    return {
      ...acc,
      [day]: answer,
    };
  }, {});
};

export const getAverageAnswers = state => {
  const answers = getAnswersOfYear(state);
  return Math.round(
    answers.map(({ answer }) => parseInt(answer, 10)).reduce((prev, next) => prev + next) /
      answers.length,
  );
};

export const progress = () => {
  const date = new Date();
  if (date.getFullYear() !== parseInt(state.selectedYear, 10)) {
    return 100;
  }
  const currentDate = getDayOfYear(new Date());
  return Math.round(currentDate / 365 * 100);
};

export const getTotalAnswers = state => getAnswersOfYear(state).length;

export const selectQuestion = question => (state.selectedQuestion = question);
export const selectFirstQuestion = () => (state.selectedQuestion = state.questions[0]);
export const selectLastYear = () => {
  const years = getSelectedQuestion(state).years;
  state.selectedYear = years[years.length - 1];
};
export const selectYear = year => (state.selectedYear = year);

export const toggleFilterEmptyDays = () => {
  state.filters = {
    ...state.filters,
    emptyDays: !state.filters.emptyDays || false,
  };
};

export const filterAnswers = () => {
  state.questions.forEach(({ question, answers }) => {
    const answersPerYear = getAnswersPerYear(answers);
    state.filteredQuestions = {
      ...state.filteredQuestions,
      [question]: {
        years: Object.keys(answersPerYear),
        answers,
      },
    };
  });

  state.questions = Object.keys(state.filteredQuestions);
  selectFirstQuestion();
  state.years = getYears(state);
  selectLastYear();
};

export const fetchQuestions = token => {
  state.loading = true;
  return fetch(`${process.env.REACT_APP_API_URL}${token}`)
    .then(response => response.json())
    .catch(err => {
      console.error(err);
      state.error = true;
    })
    .then(questions => {
      state.questions = questions;
      filterAnswers();
      state.loading = false;
    });
};

export default state;

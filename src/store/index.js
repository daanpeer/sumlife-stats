import state, {
  getSelectedQuestion,
  getAnswersOfYear,
  getAnswersPerDay,
  getAnswersPerYear,
  getYears,
  getDailyAnswers,
  progress,
  getTotalAnswers,
  selectQuestion,
  selectFirstQuestion,
  selectLastYear,
  selectYear,
  toggleFilterEmptyDays,
  filterAnswers,
  fetchQuestions,
  getAverageAnswers
} from "./questionsStore";

export {
  getSelectedQuestion,
  getAnswersOfYear,
  getAnswersPerDay,
  getAnswersPerYear,
  getYears,
  getDailyAnswers,
  getAverageAnswers,
  progress,
  getTotalAnswers,
  selectQuestion,
  selectFirstQuestion,
  selectLastYear,
  selectYear,
  toggleFilterEmptyDays,
  filterAnswers,
  fetchQuestions
};

export default state;

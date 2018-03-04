import React, { Component, Fragment } from "react";
import state, { fetchQuestions } from "./questionsStore";
import getUrlParams from "./helpers/getUrlParams";
import { withStore } from "./withStore";
import "./App.css";
import { Stats, Filters, AnswersPerDay } from "./components";

class App extends Component {
  componentDidMount() {
    const { token } = getUrlParams(window.location.search);
    if (token) {
      fetchQuestions(token);
    }
  }

  render() {
    const { loading, selectedYear, error } = state;

    if (error) {
      return "error..";
    }

    if (loading) {
      return "loading..";
    }

    return (
      <Fragment>
        <Stats />
        <div className="container">
          <Filters />
          {selectedYear && <AnswersPerDay />}
        </div>
      </Fragment>
    );
  }
}

export default withStore(App, state);

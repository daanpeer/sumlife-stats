import React, { Component } from "react";
import Answer from "../answer";
import state, { getDailyAnswers } from "../../store";

export default class AnswersPerDay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const answers = getDailyAnswers(state);
    return (
      <div className="grid">
        {Object.keys(answers).map((day, index) => {
          return (
            <Answer
              isOpen={this.state.open === day}
              onCloseAnswer={() => {
                this.setState(() => ({
                  open: null
                }));
              }}
              onOpenAnswer={() => {
                this.setState(() => ({
                  open: day
                }));
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

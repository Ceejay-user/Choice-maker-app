import React, { Component } from "react";
import Choices from "../../components/Choices/Choices";
import Answers from "../Answers/Answers";

export class ChoiceMaker extends Component {
  state = {
    counter: 3,
    question: "",
    questionCounter: 0,
    allQueestions: [],
    popularityList: {},
    chooseAnswer: true,
    toggleDisplay: false,
    placeHolder: ["D", "E", "F"],
    answers: [
      { value: "", name: "name1", placeHolder: "A:" },
      { value: "", name: "name2", placeHolder: "B:" },
      { value: "", name: "name3", placeHolder: "C:" },
    ],
  };

  onEnterQuestion = (e) => {
    this.setState({
      question: e.target.value
        .split("")
        .filter((el) => el !== "?")
        .join("")
        .concat("?"),
    });
  };

  onEnterOptions = (e) => {
    let currentInput = this.state.answers.find(
      (answer) => answer.name === e.target.name
    );

    currentInput.value = e.target.value;
    let newValue = {
      value: currentInput.value.concat("*"),
      name: currentInput.name,
      placeHolder: currentInput.placeHolder,
    };
    this.setState((prevState) => ({
      ...prevState,
      answers: prevState.answers.map((answer) =>
        answer.name === currentInput.name ? newValue : answer
      ),
    }));
  };

  onAddChoice = () => {
    let newAnswers = [...this.state.answers];
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      answers: newAnswers.concat({
        value: "",
        name: "name" + (prevState.counter + 1),
        placeHolder: this.state.placeHolder[this.state.counter - 3].concat(":"),
      }),
    }));
  };

  onToggleAnswer = () => {
    this.setState({ chooseAnswer: !this.state.chooseAnswer });
  };

  onCopyQuestion = () => {
    let currentQuestion = this.state.question.toLowerCase();
    let similarQuestions = this.state.allQueestions.filter(
      (question) => question === currentQuestion
    );
    let obj = {};
    this.state.question.split("*").map((el) => {
      if (this.state.question !== "") {
        obj[el.toLowerCase()]
          ? obj[el.toLowerCase()]++
          : (obj[el.toLowerCase()] = 1);
      }
    });
    this.state.allQueestions.map((el) => {
      if (this.state.question !== "") {
        obj[el.toLowerCase()]
          ? obj[el.toLowerCase()]++
          : (obj[el.toLowerCase()] = 1);
      }
    });
    this.setState({
      toggleDisplay: true,
      popularityList: obj,
      questionCounter: similarQuestions.length,
      allQueestions: this.state.allQueestions.concat(
        this.state.question.toLowerCase()
      ),
    });
  };

  OnToggleDisplay = () => {
    this.setState({
      toggleDisplay: false,
      question: "",
      counter: 3,
      answers: [
        { value: "", name: "name1", placeHolder: "A:" },
        { value: "", name: "name2", placeHolder: "B:" },
        { value: "", name: "name3", placeHolder: "C:" },
      ],
    });
  };

  render() {
    let addOptionsButton = (
      <button onClick={this.onAddChoice} className="btn btn-primary border">
        <strong className="font-weight-bold">+</strong>Option
      </button>
    );
    if (this.state.counter === 6) {
      addOptionsButton = (
        <button className="btn border btn-secondary disabled">
          <strong className="font-weight-bold">+</strong>Option
        </button>
      );
    }

    let choices;
    this.state.toggleDisplay
      ? (choices = null)
      : (choices = (
          <Choices
            names={this.state.names}
            options={this.state.answers}
            changed={this.onEnterOptions}
            addQuestion={this.onEnterQuestion}
            addChoice={this.onAddChoice}
          />
        ));

    let btns;
    this.state.toggleDisplay
      ? (btns = null)
      : (btns = (
          <div
            style={{ maxWidth: "90%" }}
            className="d-flex align-items-center justify-content-around mx-auto"
          >
            {addOptionsButton}
            <button
              onClick={this.onCopyQuestion}
              style={{ fontSize: "1.2rem" }}
              className=" btn btn-success px-sm-3 px-md-5 text-capitalize"
            >
              answer!
            </button>
          </div>
        ));

    let answers;
    this.state.toggleDisplay
      ? (answers = (
          <Answers
            quest={this.state.question}
            options={this.state.answers}
            counter={this.state.counter}
            popList={this.state.popularityList}
            popularity={this.state.questionCounter}
            answerToggled={this.onToggleAnswer}
            toggler={this.OnToggleDisplay}
          />
        ))
      : (answers = null);

    return (
      <div className="">
        <header className="bg-primary py-3">
          <h1
            style={{ fontSize: "2rem" }}
            className="text-uppercase text-white text-center"
          >
            choice maker app
          </h1>
          <p className="text-center text-light">
            When the decision is too hard or too simple, use the Easy Decision
            Maker
          </p>
        </header>

        {choices}

        {btns}

        {answers}
      </div>
    );
  }
}

export default ChoiceMaker;

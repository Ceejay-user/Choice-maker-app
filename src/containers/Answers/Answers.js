import React, { Component } from "react";
import PopList from "../../components/PopList/PopList";

export class Answers extends Component {
  state = {
    customAnswer: [
      { value: "Yes", name: "name1" },
      { value: "No", name: "name2" },
    ],
  };

  render() {
    let num = Math.floor(
      Math.random() *
        this.props.options.filter((answer) => answer.value !== "").length +
        1
    );
    let customNum = Math.floor(Math.random() * 2);

    let style = "font-weight-bolder text-success text-break";
    let check = this.props.options.every((answer) => answer.value === "");
    let output = this.props.options.map((answer, index) => {
      if (answer.value !== "") {
        if (index + 1 === num) {
          return (
            <li key={answer.name} className={style}>
              {answer.value
                .split("")
                .filter((x) => x !== "*")
                .join("")}
            </li>
          );
        } else {
          return (
            <li key={answer.name} className="text-break">
              {answer.value
                .split("")
                .filter((x) => x !== "*")
                .join("")}
            </li>
          );
        }
      }
    });
    if (check) {
      output = this.state.customAnswer.map((answer, index) => {
        if (check) {
          if (index === customNum) {
            return (
              <li key={answer.name} className={style}>
                {answer.value}
              </li>
            );
          } else {
            return (
              <li key={answer.name} className="text-break">
                {answer.value}
              </li>
            );
          }
        }
      });
    }

    let arrayObj = [];
    Object.entries(this.props.popList).map((el) => {
      if (el[0] !== "") {
        arrayObj.push({ name: el[0], num: el[1]});
      }
    });

    let info = null;
    if (this.props.quest === "") {
      info = (
        <div className=".row">
          <div className="col-md-8 text-center mx-auto text-danger mb-4">
            <p className="font-weight-bold">
              This is just some random question. Click on{" "}
              <span className="text-dark bg-warning">"Ask new question"</span>{" "}
              below to ask a new question.
            </p>
          </div>
        </div>
      );
    }

    let table = null;
    if (this.props.quest !== "") {
      table = (
        <div className="row">
          <p className="text-center font-weight-bold mx-auto my-3 text-primary">
            List of all asked questions in order of their popularity
          </p>
          <table className="table table-striped table-hover">
            <thead className="bg-warning">
              <tr>
                <th>Questions</th>
                <th>Popularity</th>
              </tr>
            </thead>
            <tbody>
              {arrayObj
                .sort((a, b) => parseFloat(b.num) - parseFloat(a.num))
                .map((el,index) => {
                  return <PopList question={el["name"]} num={el["num"]} ind={index} />;
                })}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div className="container-fluid px-md-5 my-5">
        {info}
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 mx-auto">
            <h3
              className="text-primary text-break pl-3"
              style={{ fontSize: "1.6rem" }}
            >
              {this.props.quest == "" || this.props.quest == "?"
                ? "Some Random Question?"
                : this.props.quest}
            </h3>
            <ol style={{ listStyleType: "upper-alpha", fontSize: "1.2rem" }}>
              {output}
            </ol>
          </div>
          <div className="col-md-3 mx-auto">
            <button
              className="btn btn-block btn-success mt-3 shadow"
              style={{ fontSize: "1.2rem" }}
              onClick={this.props.answerToggled}
            >
              Toggle Options
            </button>
            <button
              onClick={this.props.toggler}
              style={{ fontSize: "1.2rem" }}
              className="btn btn-block btn-primary shadow mb-4 mt-md-3"
            >
              &larr; &nbsp; Ask new Question
            </button>
          </div>
        </div>
        {table}
      </div>
    );
  }
}

export default Answers;

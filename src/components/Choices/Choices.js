import React from "react";
import Choice from "../Choice/Choice";

const Choices = (props) => {
  let style = {  };
  if(props.toggle == false) style = { display: "" };

  return (
    <div className="container" style={style}>
      <form className="row mx-auto px-md-5">
        <h3 className="text-primary mx-auto col-md-10 mt-5">Question</h3>
        <div className="form-group mx-auto col-md-10">
          <input
            type="text"
            id="input-question"
            name="question"
            placeholder="Q: Enter your question here"
            className="form-control form-control-lg shadow-sm"
            onChange={props.addQuestion}
          />
        </div>
        <h3 className="text-primary mx-auto col-md-10 mt-3">Options</h3>
        {props.options.map((answer) => {
          return (
            <Choice
              key={answer.name}
              change={props.changed}
              answerName={answer}
            />
          );
        })}
      </form>
    </div>
  );
};

export default Choices;

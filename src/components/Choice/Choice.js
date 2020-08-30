import React from 'react'

const Choice = (props) => {
  console.log()
  return (
    <div className="form-group mx-auto col-md-10">
      <input
        type="text"
        onChange={props.change}
        name={props.answerName.name}
        placeholder={props.answerName.placeHolder}
        className="form-control form-control-lg shadow-sm"
      />
    </div>
  );
}

export default Choice

import React from 'react'

const PopList = (props) => {
  return (
    <tr key={props.ind} className="">
      <td>{props.question}</td>
      <td>{props.num}</td>
    </tr>
  );
  
}

export default PopList

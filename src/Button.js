import React from 'react';

const Button = props => {
  return (
    <button
      onClick={props.click}
      className={props.classes}
    >{props.children}</button>
  )
}

export default Button;
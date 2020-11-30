import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = ({click}) => {
  return (
    <div onClick={click} className={classes.backdrop}></div>
  )
}

export default Backdrop;
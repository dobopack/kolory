import React from "react";

import classes from "./Input.module.css";

function Input(props) {
  return (
    <div className={classes.wrapper}>
      <input
        className={`${classes.formInput} ${props.className}`}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChangeText}
        type={props.type}
        placeholder={props.placeholder}
        rows={props.rows}
        required={props.required}>
        {props.children}
      </input>
      <span className={classes.underline}></span>
    </div>
  );
}

export default Input;

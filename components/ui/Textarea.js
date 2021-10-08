import React from "react";

import classes from "./Textarea.module.css";

function Input(props) {
  return (
    <div className={classes.wrapper}>
      <textarea
        className={`${classes.formInput} ${props.className}`}
        id={props.id}
        name={props.name}
        value={props.value}
        required={props.required}
        onChange={props.onChangeText}
        placeholder={props.placeholder}
        rows={props.rows}>
        {props.children}
      </textarea>
      <span className={classes.underline}></span>
    </div>
  );
}

export default Input;

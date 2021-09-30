import React from "react";

import classes from "./Notify.module.css";

function Notify(props) {
  return (
    <div className={`${classes.notify} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Notify;

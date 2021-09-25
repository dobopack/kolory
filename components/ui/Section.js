import React from "react";

import classes from "./Section.module.css";

function Section(props) {
  return (
    <div className={`${classes.section} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Section;

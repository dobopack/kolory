import React from "react";

import classes from "./Section.module.css";

function Section(props) {
  const sectionClass = props.className
    ? `${classes.section} ${props.className}`
    : classes.section;
  return (
    <div className={sectionClass} id={props.id}>
      {props.children}
    </div>
  );
}

export default Section;

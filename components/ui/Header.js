import React from "react";

import classes from "./Header.module.css";

function Header(props) {
  const type = props.type ? props.type : "h1";

  return (
    <div className={classes.headerContainer}>
      {type === "h1" && (
        <h1 className={`${classes.header} ${props.className}`}>
          {props.children}
        </h1>
      )}
      {type === "h2" && (
        <h2 className={`${classes.header} ${props.className}`}>
          {props.children}
        </h2>
      )}
      {type === "h3" && (
        <h3 className={`${classes.header} ${props.className}`}>
          {props.children}
        </h3>
      )}
    </div>
  );
}

export default Header;

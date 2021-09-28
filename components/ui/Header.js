import React from "react";

import classes from "./Header.module.css";

function Header(props) {
  return (
    <div className={classes.headerContainer}>
      <h1 className={`${classes.header} ${props.className}`}>
        {props.children}
      </h1>
    </div>
  );
}

export default Header;

import React from "react";

import classes from "./Header.module.css";

function Header(props) {
  return (
    <div className={classes.headerContainer}>
      <h2 className={`${classes.header} ${props.className}`}>
        {props.children}
      </h2>
    </div>
  );
}

export default Header;

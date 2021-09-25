import React from "react";

import classes from "./Header.module.css";

function Header(props) {
  return (
    <h1 className={`${classes.header} ${props.className}`}>{props.children}</h1>
  );
}

export default Header;

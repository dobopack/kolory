import React from "react";
import Image from "next/image";
import Link from "next/link";

import classes from "./ReturnButton.module.css";

import leftArrow from "../../public/left-arrow.svg";

function ReturnButton(props) {
  return (
    <Link href={props.href}>
      <div className={classes.wrapper}>
        <div className={classes.image}>
          <Image src={leftArrow} width={24} height={24}></Image>
        </div>
        <span className={classes.text}>{props.children}</span>
      </div>
    </Link>
  );
}

export default ReturnButton;

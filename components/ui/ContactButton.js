import React from "react";
import Image from "next/image";
import Link from "next/link";

import classes from "./ContactButton.module.css";

import mailIcon from "../../public/button-mail.svg";
import removeHash from "../../removeHash";

function ContactButton(props) {
  return (
    <Link legacyBehavior href={props.href} passHref={true}>
      <a
        className={`${classes.wrapper} ${
          props.className ? props.className : ""
        }`}
        onClick={removeHash}>
        <div className={classes.image}>
          <Image src={mailIcon} width={24} height={24} alt="Mail"></Image>
        </div>
        <span className={classes.text}>{props.children}</span>
      </a>
    </Link>
  );
}

export default ContactButton;

import React from "react";
import Image from "next/image";

import classes from "./AboutCard.module.css";

function AboutCard(props) {
  return (
    <div className={`${classes.card} ${props.className}`}>
      <div className={classes.cardImage}>
        <Image
          src={props.image}
          width={props.imgWidth}
          height={props.imgHeight}
          alt={props.alt}></Image>
      </div>
      <h3>{props.header}</h3>
      <p>{props.paragraph}</p>
    </div>
  );
}

export default AboutCard;

import React from "react";
import Link from "next/link";

import Section from "../ui/Section";
import classes from "./HeroSection.module.css";

import removeHash from "../../removeHash";

function HeroSection({ config }) {
  return (
    <div className={classes.hero}>
      <Section className={classes.heroContent}>
        <h1>Sięgnij po intensywny kolor, zapach i smak</h1>
        <h2>{config.company_description}</h2>
        <div className={classes.buttonSection} onClick={removeHash}>
          <Link href="/#product" passHref={true}>
            <a>
              <div
                className={`${classes.productsButton} ${classes.buttonElement}`}>
                Oferta
              </div>
            </a>
          </Link>
          <Link href="/#form" passHref={true}>
            <a>
              <div className={`${classes.ctaButton} ${classes.buttonElement}`}>
                Napisz do nas
              </div>
            </a>
          </Link>
        </div>
      </Section>
    </div>
  );
}

export default HeroSection;

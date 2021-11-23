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
        <p>{config.company_description}</p>
        <div className={classes.buttonSection} onClick={removeHash}>
          <Link href="/?t=productSection" passHref={true}>
            <a>
              <button className={classes.productsButton}>Oferta</button>
            </a>
          </Link>
          <Link href="/?t=formSection" passHref={true}>
            <a>
              <button className={classes.ctaButton}>Napisz do nas</button>
            </a>
          </Link>
        </div>
      </Section>
    </div>
  );
}

export default HeroSection;

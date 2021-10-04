import React from "react";
import Link from "next/link";

import Section from "../ui/Section";
import classes from "./HeroSection.module.css";

import removeHash from "../../removeHash";

function HeroSection() {
  return (
    <div className={classes.hero}>
      <Section className={classes.heroContent}>
        <h1>Sięgnij po intensywny kolor, zapach i smak</h1>
        <p>
          Aromaty, barwniki spożywcze, bazy do napojów i oleorezyny dla
          przemysłu
        </p>
        <div className={classes.buttonSection} onClick={removeHash}>
          <Link href="/#productSection" passHref={true}>
            <button className={classes.productsButton}>Sprawdź produkty</button>
          </Link>
          <Link href="/#formSection" passHref={true}>
            <button className={classes.ctaButton}>Napisz do nas</button>
          </Link>
        </div>
      </Section>
    </div>
  );
}

export default HeroSection;

import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import Section from "../ui/Section";
import classes from "./HeroSection.module.css";

import removeHash from "../../removeHash";

function HeroSection({ config }) {
  return (
    <div className={classes.hero}>
      <Section className={classes.heroContent}>
        <h1>{config.main_header}</h1>
        <h2>
          {config.company_description_markdown &&
          config.company_description_markdown !== "" ? (
            <ReactMarkdown>{config.company_description_markdown}</ReactMarkdown>
          ) : (
            config.company_description
          )}
        </h2>
        <div className={classes.buttonSection} onClick={removeHash}>
          <Link legacyBehavior href="/#product" passHref={true}>
            <a>
              <div
                className={`${classes.productsButton} ${classes.buttonElement}`}>
                Oferta
              </div>
            </a>
          </Link>
          <Link legacyBehavior href="/#form" passHref={true}>
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

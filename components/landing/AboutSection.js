import React from "react";
import Image from "next/image";

import aboutPartners from "../../public/about-partners.svg";
import aboutControl from "../../public/about-control.svg";
import aboutRequirements from "../../public/about-requirements.svg";

import Section from "../ui/Section";
import Header from "../ui/Header";
import AboutCard from "./AboutCard";
import classes from "./AboutSection.module.css";

function AboutSection({ config }) {
  return (
    <Section className={classes.aboutSection} id="aboutSection">
      <Header>Dlaczego my?</Header>
      <p>{config.about_description}</p>
      <div className={classes.cardSection}>
        <AboutCard
          className={classes.firstCard}
          image={config.card1_image.url}
          imgHeight={110}
          imgWidth={110}
          alt={config.card1_header}
          header={config.card1_header}
          paragraph={config.card1_content}
        />
        <AboutCard
          image={config.card2_image.url}
          imgHeight={110}
          imgWidth={110}
          alt={config.card2_header}
          header={config.card2_header}
          paragraph={config.card2_content}
        />
        <AboutCard
          className={classes.lastCard}
          image={config.card3_image.url}
          imgHeight={110}
          imgWidth={110}
          alt={config.card3_header}
          header={config.card3_header}
          paragraph={config.card3_content}
        />
      </div>
    </Section>
  );
}

export default AboutSection;

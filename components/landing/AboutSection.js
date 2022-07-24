import React from "react";

// import imageTemplate from "../../public/image-template.svg";

import Section from "../ui/Section";
import Header from "../ui/Header";
import AboutCard from "./AboutCard";
import classes from "./AboutSection.module.css";

// const getImageUrl = (image) => {
//   if (image) {
//     return image.url;
//   } else {
//     return imageTemplate;
//   }
// };

function AboutSection({ config }) {
  return (
    <Section className={classes.aboutSection} id="aboutSection">
      <Header type="h3">Dlaczego my?</Header>
      <div className={classes.cardSection}>
        <AboutCard
          className={classes.firstCard}
          image="/about-card-1.svg"
          imgHeight={110}
          imgWidth={110}
          alt={config.card1_header}
          header={config.card1_header}
          paragraph={config.card1_content}
        />
        <AboutCard
          image="/about-card-2.svg"
          imgHeight={110}
          imgWidth={110}
          alt={config.card2_header}
          header={config.card2_header}
          paragraph={config.card2_content}
        />
        <AboutCard
          className={classes.lastCard}
          image="/about-card-3.svg"
          imgHeight={110}
          imgWidth={110}
          alt={config.card3_header}
          header={config.card3_header}
          paragraph={config.card3_content}
        />
      </div>
      <p>{config.about_description}</p>
    </Section>
  );
}

export default AboutSection;

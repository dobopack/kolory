import React from "react";
import Image from "next/image";

import aboutPartners from "../../public/about-partners.svg";
import aboutControl from "../../public/about-control.svg";
import aboutRequirements from "../../public/about-requirements.svg";
import kancorLogo from "../../public/kancor-logo.jpg";
import akrasLogo from "../../public/akras-logo.jpg";

import Section from "../ui/Section";
import Header from "../ui/Header";
import AboutCard from "./AboutCard";
import classes from "./AboutSection.module.css";

function AboutSection() {
  return (
    <Section className={classes.aboutSection} id="aboutSection">
      <Header>Dlaczego my?</Header>
      <p>
        Jesteśmy aktywni na rynku od 1992 roku, zaopatrując w najwyższej jakości
        dodatki odpowiedzialne za kolor smak i zapach gotowych produktów
        spożywczych i napojów. Głównymi naszymi produktami są barwniki, aromaty
        i bazy napojowe, olejki eteryczne i oleorezyny.
      </p>
      <div className={classes.cardSection}>
        <AboutCard
          className={classes.firstCard}
          image={aboutPartners}
          imgHeight={80}
          imgWidth={90}
          alt="Partnerzy"
          header="Partnerzy"
          paragraph="Współpracujemy z międzynarodowymi producentami aromatów spożywczych
            oraz baz do napojów."
        />
        <AboutCard
          image={aboutRequirements}
          imgHeight={80}
          imgWidth={93}
          alt="Wymagania jakościowe"
          header="Wymagania jakościowe"
          paragraph="Oferowane przez nas dodatki spożywcze są produkowane przez naszych
            dostawców w zgodzie z najnowszymi przepisami oraz certyfikacjami
            kontroli jakości produkcji."
        />
        <AboutCard
          className={classes.lastCard}
          image={aboutControl}
          imgHeight={80}
          imgWidth={110}
          alt="Kontrola warunków magazynowania"
          header="Kontrola warunków magazynowania"
          paragraph="Dzięki wewnętrznemu systemowi HACCP zapewniamy odpowiedni sposób
            magazynowania substancji dodatkowych i jego stałą kontrolę."
        />
      </div>
      <div className={classes.partnersSection}>
        <p>Główni partnerzy</p>
        <div className={classes.partnerImage}>
          <Image
            src={kancorLogo}
            width={212}
            height={50}
            alt="Kancor Logo"></Image>
        </div>
        <div className={classes.partnerImage}>
          <Image
            src={akrasLogo}
            width={179}
            height={50}
            alt="Akras Logo"></Image>
        </div>
      </div>
    </Section>
  );
}

export default AboutSection;

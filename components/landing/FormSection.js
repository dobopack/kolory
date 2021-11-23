import React from "react";
import { useState } from "react";
import Link from "next/link";

import Section from "../ui/Section";
import Header from "../ui/Header";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Notify from "../ui/Notify";

import classes from "./FormSection.module.css";

function FormSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isNotificationVisible, setNotificationVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const record = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      subject: event.target.subject.value,
      content: event.target.content.value,
    };

    const response = await fetch("/api/submit-form", {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setContent("");

    showNotify();
  };

  const showNotify = () => {
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 2000);
  };

  return (
    <Section className={classes.container} id="formSection">
      <Header className={classes.header}>Skontaktuj się z nami</Header>
      <p className={classes.sectionDescription}>
        Zostaw nam wiadomość a wrócimy do Ciebie z indywidualną ofertą.
      </p>
      <form onSubmit={(event) => handleSubmit(event)} className={classes.form}>
        <div className={classes.columnsWrapper}>
          <div className={classes.firstColumn}>
            <Input
              id="name"
              name="name"
              type="text"
              value={name}
              onChangeText={(e) => {
                setName(e.target.value);
              }}
              required={true}
              placeholder="Imię i nazwisko"
            />
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChangeText={(e) => {
                setEmail(e.target.value);
              }}
              required={true}
              placeholder="Email"
            />
            <Input
              id="phone"
              name="phone"
              type="tel"
              pattern="[- +0-9]+"
              minLength={9}
              maxLength={15}
              value={phone}
              onChangeText={(e) => {
                setPhone(e.target.value);
              }}
              required={true}
              placeholder="Telefon"
            />
          </div>
          <div className={classes.secondColumn}>
            <Input
              id="subject"
              name="subject"
              type="text"
              value={subject}
              onChangeText={(e) => {
                setSubject(e.target.value);
              }}
              placeholder="Temat zapytania"
            />
            <Textarea
              id="content"
              name="content"
              value={content}
              onChangeText={(e) => {
                setContent(e.target.value);
              }}
              placeholder="Treść zapytania"
              required={true}
              rows="5"
            />
          </div>
        </div>
        <p className={classes.caption}>
          Prosimy o zapoznanie się z naszą{" "}
          <Link href="/polityka" passHref={true}>
            <a
              className={`${classes.linkCaption} ${classes.captionBold} ${classes.pointer}`}>
              polityką prywatności{" "}
            </a>
          </Link>
          oraz{" "}
          <Link href="/ochrona_danych" passHref={true}>
            <a
              className={`${classes.linkCaption} ${classes.captionBold} ${classes.pointer}`}>
              ochrony danych osobowych
            </a>
          </Link>
          . Korzystając z formularza kontaktowego zgadzasz się na przechowywanie
          podanych przez Ciebie danych w bazie danych firmy{" "}
          <span className={classes.captionBold}>
            Dobopack Trading sp. z o.o.
          </span>{" "}
          z siedzibą przy{" "}
          <span className={classes.captionBold}>
            Ludwika Rydygiera 8, 01-793 Warszawa
          </span>{" "}
          oraz na serwerze poczty elektronicznej serwisu nazwa.pl, gdzie
          przechowywana jest korespondencja email.
        </p>
        <button className={classes.formButton}>Wyślij</button>
      </form>
      <Notify className={isNotificationVisible ? classes.notification : ""}>
        Wiadomość wysłana!
      </Notify>
    </Section>
  );
}

export default FormSection;

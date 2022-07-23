import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import Link from "next/link";

import Section from "../ui/Section";
import Header from "../ui/Header";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Notify from "../ui/Notify";

import classes from "./FormSection.module.css";

function FormSection() {
  const recaptchaRef = React.createRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [notificationObject, setNotificationObject] = useState({
    visibility: false,
    message: "Wiadomość wysłana!",
    status: "success",
  });

  const onReCAPTCHAChange = async (captchaCode) => {
    if (!captchaCode) {
      return;
    }

    recaptchaRef.current.reset();

    const record = {
      name: name,
      email: email,
      phone: phone,
      subject: subject,
      content: content,
      captcha: captchaCode,
    };

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setContent("");

        showNotify("Wysłano wiadomość!", "success");
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      showNotify("Błąd wysyłania!", "error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await recaptchaRef.current.execute();
  };

  const showNotify = (message, status) => {
    setNotificationObject({
      message: message,
      status: status,
      visibility: true,
    });
    setTimeout(() => {
      setNotificationObject({
        message: message,
        status: status,
        visibility: false,
      });
    }, 2000);
  };

  return (
    <Section className={classes.container} id="formSection">
      <Header className={classes.header}>Skontaktuj się z nami</Header>
      <p className={classes.sectionDescription}>
        Zostaw nam wiadomość a wrócimy do Ciebie z indywidualną ofertą.
      </p>
      <form onSubmit={(event) => handleSubmit(event)} className={classes.form}>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={onReCAPTCHAChange}
        />
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
          <Link href="/ochrona-danych" passHref={true}>
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
      <Notify
        className={
          notificationObject.status === "success"
            ? `${classes.successNotification} ${
                notificationObject.visibility ? classes.notification : ""
              }`
            : `${classes.errorNotification} ${
                notificationObject.visibility ? classes.notification : ""
              }`
        }>
        {notificationObject.message}
      </Notify>
    </Section>
  );
}

export default FormSection;

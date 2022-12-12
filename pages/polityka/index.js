import React from "react";
import Head from "next/head";

import Header from "../../components/ui/Header";
import Section from "../../components/ui/Section";
import ReturnButton from "../../components/ui/ReturnButton";

import classes from "../../styles/polityka.module.css";

import config from "../../config";

function index() {
  return (
    <>
      <Head>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Section className={classes.wrapper}>
        <Header type="h1" className={classes.header}>
          Polityka prywatności
        </Header>
        <p>
          Dobopack Trading (DT) zastrzega sobie prawo do wprowadzania zmian w
          Polityce Prywatności. Każdego klienta DT i użytkownika serwisu
          należącego do DT obowiązuje aktualna Polityka Prywatności znajdująca
          się na tej stronie.
        </p>
        <p>
          Jakiekolwiek wprowadzane zmiany nie wpływają na podstawową zasadę:{" "}
        </p>
        <p>
          <b>
            nie sprzedajemy i nie udostępniamy osobom trzecim ani danych
            personalnych ani danych adresowych swoich klientów / użytkowników.
          </b>
        </p>
        <h3>Administrator Danych Osobowych:</h3>
        <p>
          Dobopack Trading Sp. z o.o. Rydygiera 8 01-793 Warszawa NIP:
          118-00-15-209 REGON: 012125650
        </p>
        <h3>Dane Osobowe:</h3>
        <p>
          W czasie korzystania z serwisu należącego do DT mogą Państwo zostać
          poproszeni o podanie niektórych swoich danych osobowych poprzez
          wypełnienie formularza lub w inny sposób. Dane, o które będą Państwo
          poproszeni, to imię, nazwisko, adres e-mail.{" "}
        </p>
        <p>
          Wymagamy tylko tych danych, które są niezbędne do działania serwisu.
          Niepodanie wymaganych danych zablokuje tylko czynność, której te dane
          dotyczyły.{" "}
        </p>
        <h3>Niezapowiedziane Wiadomości:</h3>
        <p>
          DT zastrzega sobie prawo do wysyłania niezapowiedzianych wiadomości
          osobom, których dane kontaktowe posiada i które zgodziły się z
          Polityką Prywatności.
        </p>
        <p>
          Pod pojęciem niezapowiedzianych wiadomości DT rozumie informacje
          odnoszące się bezpośrednio do oferowanych przez nas dodatków
          barwiących i smakowo-zapachowych do produkcji, przede wszystkim
          spożywczej, ale również farmaceutycznej, kosmetycznej i chemii
          gospodarczej, (np. zmiany i wprowadzanie nowych pozycji do naszej
          oferty, promocje) oraz niekomercyjne listy (np. życzenia, komentarze
          osobiste itp).
        </p>
        <p>
          Nie rozsyłamy wiadomości niedotyczących dodatków barwiących i
          smakowo-zapachowych. Nie zamieszczamy żadnych reklam.
        </p>
        <h3>Cookies (Ciasteczka):</h3>
        <p>
          Niektóre obszary serwisu należącego do DT mogą wykorzystywać cookies,
          czyli małe pliki tekstowe wysyłane do komputera internauty
          identyfikujące go w sposób potrzebny do uproszczenia lub umorzenia
          danej operacji.
        </p>
        <p>
          Cookies są nieszkodliwe dla komputera i jego użytkownika oraz dla
          danych użytkownika.
        </p>
        <p>
          Warunkiem działania cookies jest ich akceptacja przez przeglądarkę i
          nieusuwanie ich z dysku.
        </p>
        <p>
          Przeglądarki internetowe domyślnie dopuszczają przechowywanie plików
          cookies. Jeżeli się na to nie zgadzasz, możesz skonfigurować swoją
          przeglądarkę. Dowiesz się jak wyłączyć zapisywanie cookies z plików
          pomocy swojej przeglądarki.
        </p>
        <h3>Partnerzy:</h3>
        <p>
          Polityka Prywatności nie dotyczy serwisów i firm, których dane
          kontaktowe podane są w serwisie należącym do DT.{" "}
        </p>
        <p>
          <i>
            Niniejsza polityka prywatności DT została opracowana w oparciu o
            politykę prywatności serwisu Czas Na E-Biznes.
          </i>
        </p>
        <div className={classes.buttonWrapper}>
          <ReturnButton className={classes.returnButton} href="/#formSection">
            wróć na stronę główną
          </ReturnButton>
        </div>
      </Section>
    </>
  );
}

export default index;

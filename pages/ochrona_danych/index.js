import React from "react";
import Head from "next/head";

import Header from "../../components/ui/Header";
import Section from "../../components/ui/Section";
import ReturnButton from "../../components/ui/ReturnButton";

import classes from "../../styles/ochrona.module.css";

import config from "../../config";

function index() {
  return (
    <>
      <Head>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <meta name="keywords" content={config.keywords} />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Section className={classes.wrapper}>
        <Header className={classes.header}>Ochrona danych osobowych</Header>
        <h2>
          Informacja o zasadach przetwarzania danych osobowych w Dobopack
          Trading Sp. z o.o.
        </h2>
        <p>
          Artykuł 13 Rozporządzenia Parlamentu Europejskiego i Rady (UE)
          2016/679 z 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w
          związku z przetwarzaniem danych osobowych i w sprawie swobodnego
          przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (dalej:
          RODO) zobowiązuje nas, czyli Dobopack Trading Sp. z o.o. z siedzibą w
          Warszawie (kod pocztowy 01-793), przy ul. Ludwika Rydygiera 8,
          zarejestrowaną przez Sąd Rejonowy dla M. St. Warszawy w Warszawie, XII
          Wydział Gospodarczy Krajowego Rejestru Sądowego, NIP: 118-00-15-209,
          Regon: 012125650, do przekazania następujących informacji o sposobie
          przetwarzania danych osobowych:
        </p>
        <p>
          Administratorem Państwa danych jest Dobopack Trading Sp. z o.o. W celu
          skontaktowania się z inspektorem ochrony danych osobowych w Dobopack
          Trading prosimy o wysłanie wiadomości pod adres: Dobopack@kolory.com
          lub kontakt pod numerem telefonu: +48 507-033-685.
        </p>
        <p>
          Dobopack Trading zbiera następujące informacje podane dobrowolnie:
        </p>
        <ul>
          <li>imię i nazwisko,</li>
          <li>nazwa firmy,</li>
          <li>adres email,</li>
          <li>adres pocztowy lub inny podany adres do korespondencji,</li>
          <li>numer telefonu,</li>
          <li>numer NIP lub numer PESEL.</li>
        </ul>
        <p>
          Podanie tych danych nie jest wymagane przepisami prawa, niemniej
          odmowa ich podania może uniemożliwić zawarcie umowy sprzedaży
          oferowanych przez nas dodatków spożywczych.
        </p>
        <p>
          Podane dane osobowe wykorzystujemy w celu prowadzenia korespondencji z
          Państwem, odpowiedzi na zapytania i ewentualne reklamacje, wysyłania
          próbek oferowanych dodatków spożywczych, przedstawiania ofert
          sprzedaży,zawierania umów sprzedaży/wystawiania faktur sprzedaży.
        </p>
        <p>
          Państwa zgoda na przetwarzanie nie jest już konieczna (przetwarzanie
          realizowane jest na podstawie art. 6 ust. 1 pkt b RODO).
        </p>
        <p>Podane dane możemy wykorzystać również w celu:</p>
        <ul>
          <li>ustalenia, obrony, dochodzenia i egzekucji roszczeń,</li>
          <li>marketingu oferowanych towarów,</li>
          <li>wsparcia sprzedaży.</li>
        </ul>
        <p>
          Na przetwarzanie w tym zakresie nie jest potrzebna Państwa zgoda –
          przetwarzanie realizowane jest na podstawie art. 6 ust. 1 pkt f RODO.
        </p>
        <p>Dane mogą zostać udostępnione bądź przekazane:</p>
        <ul>
          <li>
            firmie informatycznej, serwisującej oprogramowanie wykorzystywane
            przez nas do prowadzenia działalności – w granicach takich, w jakich
            jest to konieczne dla należytego wykonywania usługi serwisu,
          </li>
          <li>
            upoważnionym organom państwowym – w granicach wyznaczonych przez
            przepisy prawa zobowiązujące Administratora do udostępnienia danych
            tym organom.
          </li>
        </ul>
        <p>
          W zależności od tego, czy są Państwo naszym Klientem czy też Dostawcą,
          Państwa dane mogą być przetwarzane przez różny okres czasu.
          Zaprzestaniemy przetwarzania danych w momencie zajścia najpóźniejszego
          z następujących zdarzeń:
        </p>
        <ul>
          <li>zakończenia obsługi korespondencji,</li>
          <li>upływu terminu przechowywania dokumentów księgowych,</li>
          <li>upływu terminu przedawnienia ewentualnych roszczeń.</li>
        </ul>
        <p>Przysługują Państwu następujące prawa:</p>
        <ul>
          <li>
            prawo do uzyskania informacji o sposobie przetwarzania danych,
          </li>
          <li>prawo dostępu do danych,</li>
          <li>prawo do sprostowania danych,</li>
          <li>prawo do usunięcia danych,</li>
          <li>prawo do ograniczenia przetwarzania,</li>
          <li>prawo do sprzeciwu wobec przetwarzania danych,</li>
          <li>prawo do niepodlegania profilowaniu,</li>
          <li>prawo do wycofania zgody na przetwarzanie.</li>
        </ul>
        <p>
          Mają Państwo również prawo złożyć skargę do Prezesa Urzędu Ochrony
          Danych Osobowych.
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

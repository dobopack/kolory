import React from "react";
import Link from "next/link";
import Image from "next/image";

import classes from "./Footer.module.css";

function Footer() {
  const fullYear = new Date().getFullYear();

  return (
    <footer className={classes.container} id="footerSection">
      <div className={classes.footerWrapper}>
        <div className={classes.logoColumn}>
          <div className={classes.logo}>
            <Link href="/" passHref={true}>
              <a>
                <Image
                  src="/logo-white.svg"
                  alt="Dobopack logo"
                  width={242}
                  height={70}
                  layout="fixed"></Image>
              </a>
            </Link>
          </div>
          <p>Dobopack Trading sp. z o.o.</p>
        </div>
        <address className={classes.secondColumn}>
          <a
            href="https://maps.google.com/?q=Ludwika+Rydygiera+8,+01-793+Warszawa"
            className={classes.footerRow}>
            <div className={classes.footerImage}>
              <Image
                src="/footer-location.svg"
                alt="Lokalizacja"
                width={14}
                height={20}
                layout="fixed"></Image>
            </div>
            <div className={classes.rowContent}>
              Rydygiera 8, 01-793 Warszawa
            </div>
          </a>
          <a href="tel:+226339626" className={classes.footerRow}>
            <div className={classes.footerImage}>
              <Image
                src="/footer-phone.svg"
                alt="Telefon stacjonarny"
                width={19}
                height={22}
                layout="fixed"></Image>
            </div>
            <div className={classes.rowContent}>22 633 96 26</div>
          </a>
          <a href="fax:+226338696" className={classes.footerRow}>
            <div className={classes.footerImage}>
              <Image
                src="/footer-fax.svg"
                alt="Fax"
                width={20}
                height={20}
                layout="fixed"></Image>
            </div>
            <div className={classes.rowContent}>22 633 86 96</div>
          </a>
        </address>
        <address className={classes.thirdColumn}>
          <a href="tel:+48508135525" className={classes.footerRow}>
            <div className={classes.footerImage}>
              <Image
                src="/footer-mobile.svg"
                alt="Telefon komórkowy"
                width={18}
                height={18}
                layout="fixed"></Image>
            </div>
            <div className={classes.rowContent}>48 508 135 525</div>
          </a>
          <a href="tel:+48507033685" className={classes.footerRow}>
            <div className={classes.footerImage}>
              <Image
                src="/footer-mobile.svg"
                alt="Telefon komórkowy"
                width={18}
                height={18}
                layout="fixed"></Image>
            </div>
            <div className={classes.rowContent}>48 507 033 685</div>
          </a>
          <a href="mailto:biuro@kolory.com" className={classes.footerRow}>
            <div className={classes.footerImage}>
              <Image
                src="/footer-mail.svg"
                alt="Mail"
                width={20}
                height={16}
                layout="fixed"></Image>
            </div>
            <div className={classes.rowContent}>biuro@kolory.com</div>
          </a>
          <a
            href="https://www.facebook.com/Dobopack-Trading-barwniki-aromaty-oleorezyny-olejki-126749011279719/"
            className={classes.footerRow}>
            <div className={classes.footerImage}>
              <Image
                src="/facebook-logo.svg"
                alt="Dobopack facebook"
                width={22}
                height={22}
                layout="fixed"></Image>
            </div>
            <div className={classes.rowContent}>dobopack</div>
          </a>
        </address>
      </div>
      <p className={classes.copyright}>
        ©{fullYear} Dobopack |{" "}
        <Link href="/polityka">Polityka prywatności</Link>
      </p>
    </footer>
  );
}

export default Footer;

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import classes from "./MainNavigation.module.css";

import removeHash from "../../removeHash";

function MainNavigation({ isMain }) {
  const logo = isMain ? "/logo-white.svg" : "/logo-dark.svg";

  const [toggleClass, setToggleClass] = useState(false);

  const toggleButton = () => {
    setToggleClass(!toggleClass);
  };

  const toggleButtonClass = toggleClass
    ? `${classes.toggleButton} ${classes.toggleButtonActive}`
    : classes.toggleButton;

  const toggleNavbarClass = toggleClass
    ? `${classes.navbar} ${classes.navbarActive}`
    : classes.navbar;

  const toggleBarClass = toggleClass
    ? `${classes.bar} ${classes.barActive}`
    : classes.bar;

  const linkClick = () => {
    setToggleClass(false);
    removeHash();
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/" passHref={true}>
          <div className={classes.logoContainer}>
            <Image src={logo} alt="Dobopack logo" layout="fill"></Image>
          </div>
        </Link>
      </div>
      <div className={toggleButtonClass} onClick={toggleButton}>
        <span
          className={`${toggleBarClass} ${classes.bar1} ${
            !isMain ? classes.darkBar : ""
          }`}></span>
        <span
          className={`${toggleBarClass} ${classes.bar2} ${
            !isMain ? classes.darkBar : ""
          }`}></span>
        <span
          className={`${toggleBarClass} ${classes.bar3} ${
            !isMain ? classes.darkBar : ""
          }`}></span>
      </div>
      <nav className={toggleNavbarClass}>
        <ul>
          <li
            onClick={linkClick}
            className={`${classes.navLinks} ${
              isMain ? classes.whiteLinks : classes.darkLinks
            }`}>
            <Link href="/#aboutSection">O nas</Link>
          </li>
          <li
            onClick={linkClick}
            className={`${classes.navLinks} ${
              isMain ? classes.whiteLinks : classes.darkLinks
            }`}>
            <Link href="/#productSection">Produkty</Link>
          </li>
          <li
            onClick={linkClick}
            className={`${classes.navLinks} ${
              isMain ? classes.whiteLinks : classes.darkLinks
            }`}>
            <Link href="/#footerSection">Kontakt</Link>
          </li>
          <li
            className={`${classes.ctaButton} ${
              isMain ? classes.whiteLinks : classes.darkLinks
            }`}
            onClick={linkClick}>
            <Link href="/#formSection">Napisz do nas</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

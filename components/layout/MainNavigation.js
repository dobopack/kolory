import classes from "./MainNavigation.module.css";
import Link from "next/link";
import Image from "next/image";

import removeHash from "../../removeHash";

function MainNavigation({ isMain }) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/" passHref={true}>
          <span>
            <Image
              src={isMain ? "/logo-white.svg" : "/logo-dark.svg"}
              alt="Dobopack logo"
              width={242}
              height={70}
              layout="fixed"></Image>
          </span>
        </Link>
      </div>
      <nav>
        <ul>
          <li
            onClick={removeHash}
            className={`${classes.navLinks} ${
              isMain ? classes.whiteLinks : classes.darkLinks
            }`}>
            <Link href="/#aboutSection">O nas</Link>
          </li>
          <li
            onClick={removeHash}
            className={`${classes.navLinks} ${
              isMain ? classes.whiteLinks : classes.darkLinks
            }`}>
            <Link href="/#productSection">Produkty</Link>
          </li>
          <li
            onClick={removeHash}
            className={`${classes.navLinks} ${
              isMain ? classes.whiteLinks : classes.darkLinks
            }`}>
            <Link href="/#footerSection">Kontakt</Link>
          </li>
          <li
            className={`${classes.ctaButton} ${
              isMain ? classes.whiteLinks : classes.darkLinks
            }`}
            onClick={removeHash}>
            <Link href="/#formSection">Napisz do nas</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

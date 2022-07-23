import Link from "next/link";

import classes from "../styles/404.module.css";

export default function Custom404() {
  return (
    <div className={classes.container}>
      <h1>404</h1>
      <h2 className={classes.titleHeader}>Strona nie znaleziona</h2>
      <Link href="/">
        <a>Wróć na stronę główną</a>
      </Link>
    </div>
  );
}

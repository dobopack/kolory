import React from "react";
import Link from "next/link";

import classes from "./Breadcrumbs.module.css";

function Breadcrumbs({ links }) {
  console.log(links);
  return (
    <div className={classes.breadcrumbs}>
      <ul>
        {links.map(({ url, name }) => {
          return (
            <li className={classes.linkItem}>
              <Link href={url}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Breadcrumbs;

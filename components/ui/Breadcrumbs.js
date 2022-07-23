import React from "react";
import Link from "next/link";

import classes from "./Breadcrumbs.module.css";

function Breadcrumbs({ links }) {
  const lastItem = links[links.length - 1];
  links = links.filter((x) => x.name !== lastItem.name);

  return (
    <div className={classes.breadcrumbs}>
      <ul>
        {links.map(({ url, name }) => {
          return (
            <li className={classes.linkItem} key={url}>
              <Link href={url}>{name}</Link>
            </li>
          );
        })}
        <li className={classes.linkItem}>{lastItem.name}</li>
      </ul>
    </div>
  );
}

export default Breadcrumbs;

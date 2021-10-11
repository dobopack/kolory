import React from "react";
import Image from "next/image";
import Link from "next/link";

import classes from "./ProductCard.module.css";

function ProductCard({ category }) {
  return (
    <Link href={`/${category.slug}`} passHref={true}>
      <div className={classes.cardContainer}>
        <div className={classes.cardInner}>
          <div className={classes.imageContainer}>
            <Image src={category.image.url} alt={category.name} layout="fill" />
          </div>
          <div className={classes.headerContainer}>
            <h2>{category.name}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;

import React from "react";
import Image from "next/image";
import Link from "next/link";

import classes from "./ProductCard.module.css";

import imageTemplate from "../../public/image-template.svg";

function ProductCard({ category }) {
  let imageUrl = "";
  if (category.image) {
    imageUrl = category.image.url;
  } else {
    imageUrl = imageTemplate;
  }

  return (
    <Link legacyBehavior href={`/${category.slug}`} passHref={true}>
      <a className={classes.cardContainer}>
        <div className={classes.cardInner}>
          <div className={classes.imageContainer}>
            <Image src={imageUrl} alt={category.name} fill />
          </div>
          <div className={classes.headerContainer}>
            <h3>{category.name}</h3>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default ProductCard;

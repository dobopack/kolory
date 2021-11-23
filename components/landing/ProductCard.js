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
    <Link href={`/${category.slug}`} passHref={true}>
      <a className={classes.cardContainer}>
        <div className={classes.cardInner}>
          <div className={classes.imageContainer}>
            <Image src={imageUrl} alt={category.name} layout="fill" />
          </div>
          <div className={classes.headerContainer}>
            <h2>{category.name}</h2>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default ProductCard;

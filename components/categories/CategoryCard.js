import React from "react";
import Image from "next/image";
import Link from "next/link";

import imageTemplate from "../../public/image-template.svg";
import imageBottle from "../../public/bottle.jpg";

import classes from "./CategoryCard.module.css";

function CategoryCard({ category, product }) {
  let imageUrl = "";
  if (product.color) {
    imageUrl = imageBottle;
  } else if (product.image) {
    imageUrl = product.image.url;
  } else {
    imageUrl = imageTemplate;
  }

  const colorCircle = product.color ? (
    <span
      className={classes.colorCircle}
      style={{ backgroundColor: `#${product.color}` }}></span>
  ) : (
    ""
  );

  return (
    <div className={classes.cardWrapper}>
      <Link href={`/${category.slug}/${product.slug}`} passHref={true}>
        <a className={classes.cardInner}>
          {colorCircle}
          <div className={classes.cardImage}>
            <Image src={imageUrl} alt={product.name} layout="fill" />
          </div>
          <div className={classes.cardDescription}>{product.name}</div>
        </a>
      </Link>
    </div>
  );
}

export default CategoryCard;

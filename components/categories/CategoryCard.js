import React from "react";
import Image from "next/image";
import Link from "next/link";

import imageTemplate from "../../public/image-template.svg";

import classes from "./CategoryCard.module.css";

function CategoryCard({ category, product }) {
  const imageUrl = product.image ? product.image.url : imageTemplate;
  return (
    <div className={classes.cardWrapper}>
      <Link href={`/${category.slug}/${product.slug}`} passHref={true}>
        <div className={classes.cardInner}>
          <div className={classes.cardImage}>
            <Image src={imageUrl} alt={product.name} layout="fill" />
          </div>
          <div className={classes.cardDescription}>{product.name}</div>
        </div>
      </Link>
    </div>
  );
}

export default CategoryCard;

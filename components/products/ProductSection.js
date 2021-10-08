import Image from "next/image";
import { useRouter } from "next/router";

import Section from "../../components/ui/Section";
import Header from "../../components/ui/Header";
import ReturnButton from "../../components/ui/ReturnButton";

import classes from "./ProductSection.module.css";

function ProductSection({ product }) {
  const router = useRouter();

  const categorySlug = router.query.categorySlug;

  return (
    <Section className={classes.container}>
      <Header>{product.name}</Header>
      <div className={classes.imageRow}>
        <div className={classes.imageContainer}>
          <Image
            src={product.image.url}
            alt={product.name}
            layout="fill"
            objectFit="contain"></Image>
        </div>
        <div className={classes.shortDescription}>
          {product.shortDescription}
        </div>
      </div>
      <div className={classes.longDescription}>{product.longDescription}</div>
      <div className={classes.buttonWrapper}>
        <ReturnButton href={`/${categorySlug}`}>wróć do produktów</ReturnButton>
      </div>
    </Section>
  );
}

export default ProductSection;

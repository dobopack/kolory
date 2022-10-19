import React from "react";

import Header from "../ui/Header";
import Section from "../ui/Section";
import ProductCard from "./ProductCard";

import classes from "./ProductsSection.module.css";

function ProductsSection({ categories, config }) {
  return (
    <Section className={classes.productsSection} id="productSection">
      <Header type="h3">Nasza oferta</Header>
      <div className={classes.cardsBox}>
        {categories.map((category, i) => (
          <ProductCard key={i} category={category} />
        ))}
      </div>
      <div className={classes.description}>{config.products_description}</div>
    </Section>
  );
}

export default ProductsSection;

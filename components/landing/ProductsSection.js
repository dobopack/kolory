import React from "react";

import Header from "../ui/Header";
import Section from "../ui/Section";
import ProductCard from "./ProductCard";

import classes from "./ProductsSection.module.css";

function ProductsSection({ categories, config }) {
  return (
    <Section className={classes.productsSection} id="productSection">
      <Header>Nasza oferta</Header>
      <p>{config.products_description}</p>
      <div className={classes.cardsBox}>
        {categories.map((category, i) => (
          <ProductCard key={i} category={category} />
        ))}
      </div>
    </Section>
  );
}

export default ProductsSection;

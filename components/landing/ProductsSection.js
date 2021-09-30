import React from "react";

import Header from "../ui/Header";
import Section from "../ui/Section";
import ProductCard from "./ProductCard";

import classes from "./ProductsSection.module.css";

function ProductsSection({ categories }) {
  return (
    <Section className={classes.productsSection} id="productSection">
      <Header>Nasze produkty</Header>
      <p>
        Sprzedawane przez nas dodatki spożywcze są substancjami skoncentrowanymi
        przeznaczonymi dla producentów artykułów spożywczych. Minimalne ilości
        zakupu uzależnione są od rodzaju towaru.
      </p>
      <div className={classes.cardsBox}>
        {categories.map((category, i) => (
          <ProductCard key={i} category={category} />
        ))}
      </div>
    </Section>
  );
}

export default ProductsSection;

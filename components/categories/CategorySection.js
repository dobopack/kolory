import React from "react";
import ReactMarkdown from "react-markdown";

import CategoryCard from "./CategoryCard";

import classes from "./CategorySection.module.css";

import configData from "../../config";

function CategorySection({ category, allCategories }) {
  const categoryIndex = allCategories.findIndex(
    (slug) => slug === category.slug
  );

  const nextCategoryIndex =
    categoryIndex === allCategories.length - 1 ? 0 : categoryIndex + 1;
  const previousCategoryIndex =
    categoryIndex === 0 ? allCategories.length - 1 : categoryIndex - 1;

  return (
    <>
      {category.product.lenght > 0 && (
        <div className={classes.productsWrapper}>
          {category.product.map((prod, i) => (
            <CategoryCard key={i} category={category} product={prod} />
          ))}
        </div>
      )}
      <div className={classes.description}>
        {category.descriptionMarkdown && category.descriptionMarkdown !== "" ? (
          <ReactMarkdown>{category.descriptionMarkdown}</ReactMarkdown>
        ) : (
          category.description
        )}
      </div>
      <div className={classes.pagination}>
        <a
          href={`${configData.baseUrl}/${allCategories[previousCategoryIndex]}`}
          className={classes.button}>
          Poprzednia
        </a>
        <span className={classes.pageIndicator}>Kategorie</span>
        <a
          href={`${configData.baseUrl}/${allCategories[nextCategoryIndex]}`}
          className={classes.button}>
          Następna
        </a>
      </div>
    </>
  );
}

export default CategorySection;

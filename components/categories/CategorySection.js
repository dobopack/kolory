import React from "react";
import { useState, useEffect } from "react";

import CategoryCard from "./CategoryCard";

import classes from "./CategorySection.module.css";

function CategorySection({ category, slug }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [productsArray, setProductsArray] = useState(
    category.product.slice(0, 8)
  );

  useEffect(() => {
    const maxPage = Math.ceil(category.product.length / 8);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let queryPage;
    if (params.p) {
      if (+params.p < 1 || +params.p > maxPage) {
        queryPage = 1;
      } else {
        queryPage = +params.p;
      }
    } else {
      queryPage = 1;
    }

    setCurrentPage(queryPage);
    setProductsArray(
      category.product.slice((queryPage - 1) * 8, queryPage * 8)
    );
    setMaxPage(maxPage);
  }, [category.product.length]);

  const showPagination = productsArray.length > 0 && maxPage > 1 ? true : false;

  return (
    <>
      <div className={classes.productsWrapper}>
        {productsArray.map((prod, i) => (
          <CategoryCard key={i} category={category} product={prod} />
        ))}
      </div>
      {showPagination && (
        <div className={classes.pagination}>
          {currentPage > 1 && (
            <a
              href={`/${slug}/?p=${currentPage - 1}`}
              className={classes.button}>
              Poprzednia
            </a>
          )}
          {currentPage <= 1 && (
            <button className={`${classes.button} ${classes.buttonDisabled}`}>
              Poprzednia
            </button>
          )}
          <span className={classes.pageIndicator}>{currentPage}</span>
          {currentPage < maxPage && (
            <a
              href={`/${slug}/?p=${currentPage + 1}`}
              className={classes.button}>
              Następna
            </a>
          )}
          {currentPage >= maxPage && (
            <button className={`${classes.button} ${classes.buttonDisabled}`}>
              Następna
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default CategorySection;

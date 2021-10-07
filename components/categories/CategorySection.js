import React from "react";
import { useState, useEffect } from "react";

import CategoryCard from "./CategoryCard";

import classes from "./CategorySection.module.css";

function CategorySection({ category }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [productsArray, setProductsArray] = useState(
    category.product.slice(0, 8)
  );

  useEffect(() => {
    setMaxPage(Math.ceil(category.product.length / 8));
  }, [category.product.length]);

  const setNextPage = () => {
    if (currentPage >= maxPage) return;
    const newCurrentPage = currentPage + 1;
    setCurrentPage(newCurrentPage);
    setProductsArray(
      category.product.slice((newCurrentPage - 1) * 8, newCurrentPage * 8)
    );
  };

  const setPreviousPage = () => {
    if (currentPage <= 1) return;
    const newCurrentPage = currentPage - 1;
    setCurrentPage(newCurrentPage);
    setProductsArray(
      category.product.slice((newCurrentPage - 1) * 8, newCurrentPage * 8)
    );
  };

  const previousButtonClass =
    currentPage <= 1
      ? `${classes.button} ${classes.buttonDisabled}`
      : classes.button;

  const nextButtonClass =
    currentPage >= maxPage
      ? `${classes.button} ${classes.buttonDisabled}`
      : classes.button;

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
          <button className={previousButtonClass} onClick={setPreviousPage}>
            Poprzednia
          </button>
          <button className={nextButtonClass} onClick={setNextPage}>
            Następna
          </button>
        </div>
      )}
    </>
  );
}

export default CategorySection;

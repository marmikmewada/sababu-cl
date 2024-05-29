import React, { useState } from "react";

import styles from "./Pagination.module.css";

function Pagination({ items, renderFunction, itemsPerPage, pageNumberLimit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(pageNumberLimit);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  //
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedList = items?.sort((a, b) => b.id - a.id);

  const currentItems = sortedList?.slice(indexOfFirstItem, indexOfLastItem);

  const pages = [];

  for (let i = 1; i <= Math.ceil(items?.length / itemsPerPage); i++) {
    pages.push(i);
  }

  function handleClick(e) {
    setCurrentPage(Number(e.target.id));
  }

  function handleNextButton() {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  function handlePreviousButton() {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setmaxPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }

  const RenderPageNumber = pages.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? styles.active : null}
      >
        {number}
      </li>
    );
  });

  return (
    <div className={styles.events}>
      {renderFunction(currentItems)}
      <ul className={styles.pageNumbers}>
        <li>
          <button
            onClick={handlePreviousButton}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {RenderPageNumber}
        <li>
          <button
            onClick={handleNextButton}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
      {/* <li>Load More</li> */}
    </div>
  );
}

export default Pagination;

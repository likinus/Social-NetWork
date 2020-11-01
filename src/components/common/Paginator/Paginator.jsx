import React, { useState } from 'react';
import styles from '../../Users/users.module.css';

let Paginator = ({ currentPage, onPageChanged, totalItemsCount, pageSize, portionSize = 10 }) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  let rigthPortionNumber = portionNumber * portionSize;

  return (
    <>
      <div className={styles.paginator}>
        {portionNumber > 1 && (
          <button onClick={() => setPortionNumber(portionNumber - 1)}>Previos</button>
        )}

        {pages
          .filter((p) => p >= leftPortionNumber && p <= rigthPortionNumber)
          .map((p) => {
            return (
              <span
                key={p}
                onClick={(e) => {
                  onPageChanged(p);
                }}
                className={currentPage === p ? styles.selectedPage : styles.pageNumber}>
                {p}
              </span>
            );
          })}
        {portionCount > portionNumber && (
          <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>
        )}
      </div>
    </>
  );
};

export default Paginator;

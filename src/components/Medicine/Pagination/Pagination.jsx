import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPage } from "../../../redux/pharmacy/selectors";
import { setCurrentPage } from "../../../redux/pharmacy/slice";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useMediaQuery } from "react-responsive";
import styles from "./Pagination.module.css";

const Pagination = ({ totalPages }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const buttonsPerPage = isMobile ? 2 : 3;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageClick = useCallback(
    (pageNumber) => {
      dispatch(setCurrentPage(pageNumber));
    },
    [dispatch]
  );

  const handlePrevClick = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const start = Math.max(1, currentPage - Math.floor(buttonsPerPage / 2));
    const end = Math.min(totalPages, start + buttonsPerPage - 1);

    for (let i = start; i <= end; i++) {
      pageButtons.push(
        <button
          key={i}
          type="button"
          className={`${styles.btn} ${i === currentPage ? styles.btnCurrent : ""}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnList}>
        <button
          type="button"
          className={styles.btn}
          onClick={() => dispatch(setCurrentPage(1))}
        >
          <BiFirstPage style={{ fill: "#1D1E21" }} />
        </button>

        <button type="button" className={styles.btn} onClick={handlePrevClick}>
          <GrFormPrevious />
        </button>
      </div>

      <div className={styles.btnList}>
        {currentPage > Math.floor(buttonsPerPage / 2) + 1 && (
          <button type="button" className={styles.btn} onClick={handlePrevClick}>
            ...
          </button>
        )}

        {renderPageButtons()}

        {currentPage < totalPages - Math.floor(buttonsPerPage / 2) && (
          <button type="button" className={styles.btn} onClick={handleNextClick}>
            ...
          </button>
        )}
      </div>

      <div className={styles.btnList}>
        <button type="button" className={styles.btn} onClick={handleNextClick}>
          <GrFormNext />
        </button>

        <button
          type="button"
          className={styles.btn}
          onClick={() => dispatch(setCurrentPage(totalPages))}
        >
          <BiLastPage />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

import React, { useEffect, useState, useMemo } from "react";
import styles from '../../../styles/components/Pagination.module.scss'

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 10,
  firstPage = 1,
  currentPage = 1,
  onPageChange
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];
    let showStart = currentPage + 5 > totalPages && totalPages > 5 ? totalPages - 5 : currentPage
    let showEnd = currentPage + 5 <= totalPages ? currentPage + 5 : totalPages
    for (let i = showStart; i <= showEnd; i++) {
      pages.push(
        <span key={i} className={i === currentPage ? styles.selected : ''} onClick={() => onPageChange(i)}>{i}</span>
      );
    }
    return pages;
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;
  const isFirstPage = currentPage === firstPage
  const isLastPage = currentPage === totalPages

  return (
    <div className={styles.pagination}>
      <span onClick={() => onPageChange(firstPage)}
        className={isFirstPage ? styles.disabled : ''}
        disabled={isFirstPage}><i className="fas fa-angle-double-left"></i></span>
      <span onClick={() => isFirstPage ? '' : onPageChange(currentPage - 1)}
        className={isFirstPage ? styles.disabled : ''}
        disabled={isFirstPage}><i className="fas fa-angle-left"></i></span>
      {paginationItems}
      <span onClick={() => isLastPage ? '' : onPageChange(currentPage + 1)}
        className={isLastPage ? styles.disabled : ''}
        disabled={isLastPage}><i className="fas fa-angle-right"></i></span>
      <span onClick={() => onPageChange(totalPages)}
        className={isLastPage ? styles.disabled : ''}
        disabled={isLastPage}><i className="fas fa-angle-double-right"></i></span>
    </div>
  );
};

export default PaginationComponent;
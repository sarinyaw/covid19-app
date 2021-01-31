import React, { useEffect, useState, useMemo } from "react";
import styles from '../../../styles/utils/Pagination.module.scss'

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 10,
  firstPage = 1,
  currentPage = 1,
  customStyle,
  onPageChange
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const [paginationItems, setpaginationItems] = useState([])

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  useEffect(() => {
    const pages = [];
    let showStart, showEnd = 0
    if (currentPage <= 2) {
      showStart = firstPage
      showEnd = totalPages <= 5 ? totalPages : 5
    } else {
      if (currentPage + 2 < totalPages) {
        showStart = currentPage - 2
        showEnd = currentPage + 2
      } else {
        showStart = totalPages - 4 <= firstPage ? firstPage : totalPages - 4
        showEnd = totalPages
      }
    }
    for (let i = showStart; i <= showEnd; i++) {
      pages.push(
        i === currentPage ?
          (
            <span key={i} className={styles.selected}
              style={customStyle.pageItemSelect}
              onClick={() => onPageChange(i)} >{i}</span>) :
          (
            <span key={i} style={customStyle.pageItem} onClick={() => onPageChange(i)}>{i}</span>
          )
      );
    }
    setpaginationItems(pages)
  }, [totalPages, currentPage, customStyle]);

  if (totalPages === 0) return null;
  const isFirstPage = currentPage === firstPage
  const isLastPage = currentPage === totalPages

  return (
    <div className={styles.pagination} style={customStyle.page}>
      <span onClick={() => onPageChange(firstPage)}
        style={!isFirstPage ? customStyle.pageItem : []}
        className={isFirstPage ? styles.disabled : ''}
        disabled={isFirstPage}><i className="fas fa-angle-double-left"></i></span>
      <span onClick={() => isFirstPage ? '' : onPageChange(currentPage - 1)}
        style={!isFirstPage ? customStyle.pageItem : []}
        className={isFirstPage ? styles.disabled : ''}
        disabled={isFirstPage}><i className="fas fa-angle-left"></i></span>
      {paginationItems}
      <span onClick={() => isLastPage ? '' : onPageChange(currentPage + 1)}
        style={!isLastPage ? customStyle.pageItem : []}
        className={isLastPage ? styles.disabled : ''}
        disabled={isLastPage}><i className="fas fa-angle-right"></i></span>
      <span onClick={() => onPageChange(totalPages)}
        style={!isLastPage ? customStyle.pageItem : []}
        className={isLastPage ? styles.disabled : ''}
        disabled={isLastPage}><i className="fas fa-angle-double-right"></i></span>
    </div>
  );
};

export default PaginationComponent;
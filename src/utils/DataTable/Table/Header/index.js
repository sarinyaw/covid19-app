import React, { useState, useEffect } from "react";

const HeaderComponent = ({ styles, customStyle, headers, onSorting }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };
  return (
    <thead className={styles.thead}>
      <tr style={customStyle.header}>
        {headers.map(({ name, field, sortable, checked }) => {
          return checked ?
            (<th
              key={name}
              className={sortable ? styles.sortable : styles.unsortable}
            >
              <span onClick={() => sortable ? onSortingChange(field) : null}>{name}</span>
              {sortingField && sortingField === field && (
                sortingOrder === "asc"
                  ? <i className="fas fa-arrow-down"></i>
                  : <i className="fas fa-arrow-up"></i>
              )}
            </th>) : (null)
        })}
      </tr>
    </thead>
  );
};

export default HeaderComponent;
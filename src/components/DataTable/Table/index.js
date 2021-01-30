import React, { useState } from "react";
import TableHeader from "./Header";
import styles from '../../../styles/components/Table.module.scss'

const TableComponent = ({ headers, data, onSorting }) => {
  return (
    <table className={styles.table}>
      <TableHeader
        styles={styles}
        headers={headers}
        onSorting={onSorting}
      />
      <tbody className={styles.tbody}>
        {data.map((value, key) => (
          <tr key={key}>
            {headers.map((element) => {
              return <td key={`${element.field}-${key}`} className={styles[element.align]}>{value[element.field]}</td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
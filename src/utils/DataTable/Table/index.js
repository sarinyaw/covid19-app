import React, { useState } from "react";
import TableHeader from "./Header";
import styles from '../../../styles/utils/Table.module.scss'

const TableComponent = ({ headers, data, customStyle, onSorting }) => {
  return (
    <table className={styles.table}>
      <TableHeader
        styles={styles}
        customStyle={customStyle}
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
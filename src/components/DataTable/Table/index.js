import React, { useState } from "react";
import TableHeader from "./Header";

const TableComponent = ({ headers, data, onSorting }) => {
  return (
    <table>
      <TableHeader
        headers={headers}
        onSorting={onSorting}
      />
      <tbody>
        {data.map((value, key) => (
          <tr key={key}>
            <th scope="row">
              {value.No}
            </th>
            {headers.map((element) => {
              return <td>{value[element.field]}</td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
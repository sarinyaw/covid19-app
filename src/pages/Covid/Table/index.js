import React, { useState, useMemo } from "react";
import { TableComponent, PaginationComponent } from "../../../components/DataTable";

const Table = ({ filter, headers }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const ITEMS_PER_PAGE = 25;

  const dataMemo = useMemo(() => {
    let data = filter;
    setTotalItems(data.length);
    //Sorting
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      data = data.sort(
        (a, b) => {
          if (sorting.field === ("Age" || "StatQuarantine")) {
            return reversed * (a[sorting.field] - b[sorting.field])
          }
          if (a[sorting.field] && b[sorting.field]) {
            return reversed * a[sorting.field].localeCompare(b[sorting.field])
          }
          return reversed
        }
      );
    }
    //Current Page slice
    return data.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [filter, currentPage, sorting])

  return (
    <div>
      <div>
        <PaginationComponent
          total={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
      <TableComponent
        headers={headers}
        data={dataMemo}
        onSorting={(field, order) =>
          setSorting({ field, order })
        }
      />
    </div>
  )
}

export default Table;
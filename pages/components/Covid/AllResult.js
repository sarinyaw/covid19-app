import React, { useEffect, useState, useMemo } from "react";
import { TableHeader, Pagination } from "../DataTable";

const AllResult = ({ covid }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const ITEMS_PER_PAGE = 25;

  const headers = [
    {
      name: 'หมายเลข',
      field: 'No',
      sortable: true,
    },
    {
      name: 'วันที่ยืนยัน',
      field: 'ConfirmDateBud',
      sortable: true,
    },
    {
      name: 'อายุ',
      field: 'Age',
      sortable: true,
    },
    {
      name: 'เพศ',
      field: 'Gender',
      sortable: true,
    },
    {
      name: 'Gender',
      field: 'GenderEn',
      sortable: true,
    },
    {
      name: 'ประเทศ',
      field: 'Nation',
      sortable: true,
    },
    {
      name: 'Nation',
      field: 'NationEn',
      sortable: true,
    },
    {
      name: 'จังหวัด',
      field: 'Province',
      sortable: true,
    },
    {
      name: 'Province',
      field: 'ProvinceEn',
      sortable: true,
    },
    {
      name: 'อำเภอ/แขวง',
      field: 'District',
      sortable: true,
    },
    {
      name: 'รายละเอียด',
      field: 'Detail',
      sortable: false,
    },
    {
      name: 'จำนวนวันกักตัว',
      field: 'StatQuarantine',
      sortable: true,
    }
  ];

  const covidData = useMemo(() => {
    let data = covid;
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
  }, [covid, currentPage, sorting])

  return (
    <div>
      <div>
        <Pagination
          total={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
      <table>
        <TableHeader
          headers={headers}
          onSorting={(field, order) =>
            setSorting({ field, order })
          }
        />
        <tbody>
          {covidData.map((value, key) => (
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
    </div>
  )
}

export default AllResult;
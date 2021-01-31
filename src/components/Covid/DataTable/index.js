import React, { useState, useEffect, useMemo } from "react";
import Select, { createFilter } from 'react-select'
import { TableComponent, PaginationComponent } from "../../../utils/DataTable";
import styles from '../../../styles/components/DataTable.module.scss'

const Table = ({ filter, headers }) => {
  const [showData, setShowData] = useState(filter);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [itemsPerPage, setItemPerPage] = useState(10)
  const [colorsOption, setColorsOption] = useState([])
  const [colorSelected, setColorSelected] = useState('cadetblue')
  const [customStyle, setCustomStyle] = useState({})
  const options = [
    { value: 10, label: 10 },
    { value: 15, label: 15 },
    { value: 25, label: 25 },
    { value: 50, label: 50 },
    { value: 100, label: 100 }
  ]

  const limitData = (data) => {
    return data.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage
    );
  }

  useMemo(() => {
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
    data = limitData(filter)
    setShowData(data)
  }, [filter, currentPage, sorting])

  useEffect(() => {
    let data = filter;
    data = limitData(data)
    setShowData(data)
  }, [filter, itemsPerPage]);

  useEffect(() => {
    fetch('/api/color')
      .then((res) => res.json())
      .then((data) => {
        let newColors = []
        Object.keys(data).map((key, index) => {
          newColors[index] = { value: key, label: key }
        })
        setColorsOption(newColors);
      });
  }, [])

  const changeColor = e => {
    if (e) {
      let style = {
        page: {
          borderColor: e.value
        },
        pageItem: {
          color: e.value
        },
        pageItemSelect: {
          backgroundColor: e.value
        },
        header: {
          backgroundColor: e.value,
          color: 'white'
        }
      }
      setColorSelected(e.value)
      setCustomStyle(style)
    }
  }

  const changePageItem = e => {
    setItemPerPage(e.value)
    setCurrentPage(1)
  }

  return (
    <div className={styles.dataTable}>
      <div className={styles.menu}>
        <Select
          id="select-color"
          instanceId="select-color"
          placeholder="color"
          className={styles.selectColor}
          name="color"
          filterOption={createFilter({ matchFrom: "start" })}
          options={colorsOption}
          value={colorsOption.find(color => color.label === colorSelected)}
          onChange={changeColor}
        />
        <Select
          id="page-item"
          instanceId="page-item"
          name="pageItem"
          className={styles.selectOption}
          options={options}
          defaultValue={options[0]}
          onChange={changePageItem}
          isSearchable={false}
        />
      </div>
      <TableComponent
        headers={headers}
        data={showData}
        customStyle={customStyle}
        onSorting={(field, order) =>
          setSorting({ field, order })
        }
      />
      <div className={styles.menu}>
        <PaginationComponent
          total={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          customStyle={customStyle}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  )
}

export default Table;
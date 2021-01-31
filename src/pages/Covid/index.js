import React, { useState, useEffect } from 'react';
import Select, { createFilter } from 'react-select'
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

import Table from '../../components/Covid/DataTable'
import { DateTimeRangeComponent } from '../../utils/Form'
import AllCases from '../../components/Covid/Header/AllCases'

import styles from '../../styles/pages/Covid.module.scss'

const Covid = () => {
  dayjs.extend(buddhistEra)
  dayjs.extend(localizedFormat)
  dayjs.extend(isSameOrBefore)
  dayjs.extend(isSameOrAfter)
  const [provinces, setProvinces] = useState([]);
  const [group, setGroupColumn] = useState(0);
  const [filterResult, setFilterResult] = useState([]);
  const [isLoadApi, setIsLoadApi] = useState(false)
  const [columns, setColumns] = useState(AllCases())
  const [filterColumns, setFilterColumns] = useState(AllCases())
  let date = new Date()
  const [stateFilter, setStateFilter] = useState({
    startDate: new Date(new Date(date - 86400000 * 30)),
    startTime: '00:00',
    endDate: new Date(date),
    endTime: '00:00',
    startDateTime: new Date(new Date(date - 86400000 * 30).setHours(0, 0, 0, 0)),
    endDateTime: new Date(date.setHours(0, 0, 0, 0)),
    province: 'ทุกจังหวัด'
  })

  useEffect(() => {
    setIsLoadApi(true)
    fetch('/api/province')
      .then((res) => res.json())
      .then((data) => {
        let newProvinces = Object.keys(data).map((k) => data[k])
        newProvinces.map((province, key) => {
          province.value = key + 1
          province.label = province.name.th
          delete province.name;
        })
        newProvinces = [{ value: 0, label: "ทุกจังหวัด" }, ...newProvinces]
        setProvinces(newProvinces);
        setIsLoadApi(false)
      });
  }, [])

  const search = () => {
    setIsLoadApi(true)
    fetch('/api/case')
      .then((res) => res.json())
      .then((data) => {
        let newData = data.Data;
        newData.map((value, key) => {
          value.ConfirmDateBud = dayjs(value.ConfirmDate).format('DD/MM/BBBB HH:mm:ss')
        })
        filterData(newData)
        setIsLoadApi(false)
      })
  }

  const checkStart = (data, start) => dayjs(data.ConfirmDate).isSameOrAfter(dayjs(start))
  const checkEnd = (data, end) => dayjs(data.ConfirmDate).isSameOrBefore(dayjs(end))
  const checkStartToEnd = (data, start, end) => checkStart(data, start) && checkEnd(data, end)
  const checkProvince = (data, province) => data.Province === province

  const filterData = (data) => {
    let { startDateTime, endDateTime, province } = stateFilter

    let filters = []
    if (startDateTime && endDateTime) {
      if (province && province !== 'ทุกจังหวัด') {
        filters = data.filter((value) => checkStartToEnd(value, startDateTime, endDateTime) && checkProvince(value, province))
      } else if (province && province == 'ทุกจังหวัด') {
        filters = data.filter((value) => checkStartToEnd(value, startDateTime, endDateTime))
      }
    }
    setFilterResult(filters)
  }

  const changeProvince = e => {
    let province = e ? e.label : ''
    setStateFilter({
      ...stateFilter,
      province: province
    })
  }

  const changeStartDate = e => {
    let start = e ? e : ''
    setStateFilter({
      ...stateFilter,
      startDate: start,
      startDateTime: start
    })
  }

  const changeEndDate = e => {
    let end = e ? e : ''
    setStateFilter({
      ...stateFilter,
      endDate: end,
      endDateTime: end
    })
  }

  const changeStartTime = e => {
    let time = e ? e : ''
    let start = new Date(dayjs(`${dayjs(stateFilter.startDate).format('YYYY-MM-DD')} ${time}`))
    setStateFilter({
      ...stateFilter,
      startTime: time,
      startDateTime: e ? start : ''
    })
  }
  const changeEndTime = e => {
    let time = e ? e : ''
    let end = new Date(dayjs(`${dayjs(stateFilter.endDate).format('YYYY-MM-DD')} ${time}`))
    setStateFilter({
      ...stateFilter,
      endTime: time,
      endDateTime: e ? end : ''
    })
  }

  const changeColumn = (e, index) => {
    let newColumns = columns
    newColumns[index].checked = e.target.checked
    setColumns(newColumns)
    let filters = newColumns.filter((value) => value.checked === true)
    setFilterColumns(filters)
  }

  return (
    <section className={isLoadApi ? styles.block : ''}>
      <h1>ข้อมูลเคส COVID-19</h1>
      <div className="search-wrapper">
        <div className="format-select">
          <label id="select-province" >จังหวัด</label>
          <Select
            id="search-province"
            instanceId="search-province"
            placeholder="จังหวัด"
            className="select"
            name="province"
            filterOption={createFilter({ matchFrom: "start" })}
            options={provinces}
            defaultValue={provinces[0]}
            isClearable={true}
            value={provinces.find(province => province.label === stateFilter.province)}
            onChange={changeProvince}
          />
        </div>
        <DateTimeRangeComponent
          datetime={stateFilter}
          changeStartDate={changeStartDate}
          changeStartTime={changeStartTime}
          changeEndDate={changeEndDate}
          changeEndTime={changeEndTime}
        />
        <button className="button button-search" onClick={() => search()}>ค้นหา</button>
      </div>
      <div className={styles.groupMenu}>
        {columns.map((column, index) => (
          <label key={`column-checkbox-${index}`}>
            <input
              key={`column-check-${index}`}
              name="columnCheck"
              type="checkbox"
              checked={column.checked}
              onChange={e => changeColumn(e, index)} />
            {column.name}
          </label>
        ))}

      </div>
      {isLoadApi ?
        (<div className={styles.loading}>กำลังโหลดข้อมูล...</div>) :
        filterResult.length === 0 ? '' : <Table filter={filterResult} headers={filterColumns} />
      }
    </section>
  )
}

export default Covid;
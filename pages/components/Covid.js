import React, { useState, useEffect } from 'react';
import Select, { createFilter } from 'react-select'
import AllResult from './Covid/AllResult'
import Profile from './Covid/Profile'
import Area from './Covid/Area'
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import styles from '../../styles/Covid.module.scss'
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import TimePicker from 'react-time-picker/dist/entry.nostyle'


const Covid = () => {
  dayjs.extend(buddhistEra)
  dayjs.extend(localizedFormat)
  dayjs.extend(isSameOrBefore)
  dayjs.extend(isSameOrAfter)
  const [provinces, setProvinces] = useState([]);
  const [group, setGroupColumn] = useState(0);
  const [filterResult, setFilterResult] = useState([]);
  let date = new Date()
  const [stateFilter, setStateFilter] = useState({
    startDate: new Date(new Date(date - 86400000 * 16)),
    startTime: '00:00',
    endDate: new Date(date),
    endTime: '00:00',
    startDateTime: new Date(new Date(date - 86400000 * 16).setHours(0, 0, 0, 0)),
    endDateTime: new Date(date.setHours(0, 0, 0, 0)),
    province: ''
  })

  const TableComponent = {
    0: <AllResult covid={filterResult} />,
    1: <Profile covid={filterResult} />,
    2: <Area covid={filterResult} />
  };

  useEffect(() => {
    console.log(stateFilter)
    fetch('/data/province.json')
      .then((res) => res.json())
      .then((data) => {
        let newProvinces = Object.keys(data).map((k) => data[k])
        newProvinces.map((province, key) => {
          province.value = key + 1
          province.label = province.name.th
          delete province.name;
        })
        setProvinces(newProvinces);
      });
  }, [])

  const checkValue = (value) => value ? value : 'ไม่ระบุ'

  const search = () => {
    fetch('/data/case.json')
      .then((res) => res.json())
      .then((data) => {
        let newData = data.Data;
        newData.map((value, key) => {
          value.ConfirmDateBud = dayjs(value.ConfirmDate).format('DD/MM/BBBB HH:mm:ss')
        })
        filterData(newData)
      })
  }

  const checkStart = (data, start) => dayjs(data.ConfirmDate).isSameOrAfter(dayjs(start))
  const checkEnd = (data, end) => dayjs(data.ConfirmDate).isSameOrBefore(dayjs(end))
  const checkStartToEnd = (data, start, end) => checkStart(data, start) && checkEnd(data, end)
  const checkProvince = (data, province) => data.Province === province

  const filterData = (data) => {
    let { startDateTime, endDateTime, province } = stateFilter
    console.log([startDateTime, endDateTime, province])
    let filters = []
    if (startDateTime && endDateTime) {
      if (province) {
        filters = data.filter((value) => checkStartToEnd(value, startDateTime, endDateTime) && checkProvince(value, province))
      } else {
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
    console.log(start)
    console.log(stateFilter)
  }

  const changeEndDate = e => {
    let end = e ? e : ''
    setStateFilter({
      ...stateFilter,
      endDate: end,
      endDateTime: end
    })
    console.log(end)
    console.log(stateFilter)
  }

  const changeStartTime = e => {
    let time = e ? e : ''
    let start = new Date(dayjs(`${dayjs(stateFilter.startDate).format('YYYY-MM-DD')} ${time}`))
    setStateFilter({
      ...stateFilter,
      startTime: time,
      startDateTime: e ? start : ''
    })
    console.log(time)
    console.log(start)
    console.log(stateFilter)
  }
  const changeEndTime = e => {
    let time = e ? e : ''
    let end = new Date(dayjs(`${dayjs(stateFilter.endDate).format('YYYY-MM-DD')} ${time}`))
    setStateFilter({
      ...stateFilter,
      endTime: time,
      endDateTime: e ? end : ''
    })
    console.log(time)
    console.log(end)
    console.log(stateFilter)
  }
  return (
    <section>
      <h1>Covid</h1>
      <div>
        <Select
          id="search-province"
          instanceId="search-province"
          placeholder="จังหวัด"
          name="province"
          filterOption={createFilter({ matchFrom: "start" })}
          options={provinces}
          isClearable={true}
          value={provinces.find(province => province.label === stateFilter.province)}
          onChange={changeProvince}
        />
      </div>
      <div id="start-date">
        <label>
          Start:
          <DatePicker
            onChange={changeStartDate}
            value={stateFilter.startDate}
            locale="th-TH"
            format="dd/MM/y"
            required={true}
          />
          <TimePicker
            onChange={changeStartTime}
            value={stateFilter.startTime}
            format="HH:mm"
            disableClock={true}
            required={true}
          />
        </label>
      </div>
      <div id="end-date">
        <label>
          End:
          <DatePicker
            onChange={changeEndDate}
            value={stateFilter.endDate}
            locale="th-TH"
            format="dd/MM/y"
            required={true}
          />
          <TimePicker
            onChange={changeEndTime}
            value={stateFilter.endTime}
            format="HH:mm"
            disableClock={true}
            required={true}
          />
        </label>
      </div>
      <div>
        <button onClick={() => search()}>ค้นหา</button>
      </div>
      <div>
        <button onClick={() => setGroupColumn(0)}>ข้อมูลทั้งหมด</button>
        <button onClick={() => setGroupColumn(1)}>ข้อมูลบุคคล</button>
        <button onClick={() => setGroupColumn(2)}>ข้อมูลพื้นที่</button>
      </div>
      {
        filterResult.length === 0 ? '' : TableComponent[group]
      }
    </section>
  )
}

export default Covid;
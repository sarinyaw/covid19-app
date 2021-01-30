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
  const [covid, setCovid] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [group, setGroupColumn] = useState(1);
  const [filterResult, setFilterResult] = useState([]);
  let date = new Date()
  const [stateDateTime, setStateDateTime] = useState({
    startDateTime: new Date(new Date(date - 86400000 * 16).setHours(0, 0, 0, 0)),
    endDateTime: new Date(date.setHours(0, 0, 0, 0))
  })

  const TableComponent = {
    0: <AllResult covid={filterResult} />,
    1: <Profile covid={filterResult} />,
    2: <Area covid={filterResult} />
  };

  useEffect(() => {
    fetch('/province.json')
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
    fetch('/case.json')
      .then((res) => res.json())
      .then((data) => {
        let newData = data.Data;
        newData.map(value => {
          value.ConfirmDateBud = dayjs(value.ConfirmDate).format('DD/MM/BBBB HH:mm:ss')
        })
        console.log(stateDateTime)
        setCovid(newData);
        let filters = newData.filter((value) => checkDate(value, stateDateTime.startDateTime, stateDateTime.endDateTime))
        setFilterResult(filters)
      });
  }, [])

  const checkStart = (data, start) => dayjs(data.ConfirmDate).isSameOrAfter(dayjs(start))
  const checkEnd = (data, end) => dayjs(data.ConfirmDate).isSameOrBefore(dayjs(end))
  const checkDate = (data, start, end) => checkStart(data, start) && checkEnd(data, end)
  const checkProvince = (data, province) => data.Province === province

  const filterData = (start, end, province) => {
    if (province) {
      return covid.filter((value) => checkDate(value, start, end) && checkProvince(value, province))
    } else {
      return covid.filter((value) => checkDate(value, start, end))
    }
  }

  const changeStartDate = e => {
    let start = e ? e : stateDateTime.startDateTime
    let end = stateDateTime.endDateTime
    setStateDateTime({
      ...stateDateTime,
      startDateTime: start
    })
    let province = selectedProvince
    let filters = filterData(start, end, province)
    setFilterResult(filters)
  }

  const changeEndDate = e => {
    let start = stateDateTime.startDateTime
    let end = e ? e : stateDateTime.endDateTime
    setStateDateTime({
      ...stateDateTime,
      endDateTime: end
    })
    let province = selectedProvince
    let filters = filterData(start, end, province)
    setFilterResult(filters)
  }

  const changeProvince = e => {
    let start = stateDateTime.startDateTime
    let end = stateDateTime.endDateTime
    let province = e ? e.label : ''
    setSelectedProvince(province)
    let filters = filterData(start, end, province)
    setFilterResult(filters)
  }

  const changeStartTime = e => {
    let time = e ? e : stateDateTime.startDateTime
    let start = dayjs(`${dayjs(stateDateTime.startDateTime).format('YYYY-MM-DD')} ${time}`)
    let end = stateDateTime.endDateTime
    setStateDateTime({
      ...stateDateTime,
      startDateTime: new Date(start)
    })
    let province = selectedProvince
    let filters = filterData(start, end, province)
    setFilterResult(filters)
  }
  const changeEndTime = e => {
    let time = e ? e : stateDateTime.endDateTime
    let end = dayjs(`${dayjs(stateDateTime.endDateTime).format('YYYY-MM-DD')} ${time}`)
    let start = stateDateTime.startDateTime
    setStateDateTime({
      ...stateDateTime,
      endDateTime: new Date(end)
    })
    let province = selectedProvince
    let filters = filterData(start, end, province)
    setFilterResult(filters)
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
          value={provinces.find(province => province.label === selectedProvince)}
          onChange={changeProvince}
        />
      </div>
      <div id="start-date">
        <label>
          Start:
          <DatePicker
            onChange={changeStartDate}
            value={stateDateTime.startDateTime}
            locale="th-TH"
            format="dd/MM/y"
          />
          <TimePicker
            onChange={changeStartTime}
            value={stateDateTime.startDateTime}
            format="HH:mm"
          />
        </label>
      </div>
      <div id="end-date">
        <label>
          End:
          <DatePicker
            onChange={changeEndDate}
            value={stateDateTime.endDateTime}
            locale="th-TH"
            format="dd/MM/y"
          />
          <TimePicker
            onChange={changeEndTime}
            value={stateDateTime.endDateTime}
            format="HH:mm"
          />
        </label>
      </div>
      <div>
        <p>Group</p>
        <button onClick={() => setGroupColumn(0)}>ข้อมูลทั้งหมด</button>
        <button onClick={() => setGroupColumn(1)}>ข้อมูลบุคคล</button>
        <button onClick={() => setGroupColumn(2)}>ข้อมูลพื้นที่</button>
      </div>
      {
        covid.length === 0 ? (
          <p>fetching...</p>
        ) : TableComponent[group]
      }
    </section>
  )
}

export default Covid;
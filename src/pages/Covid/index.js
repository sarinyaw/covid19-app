import React, { useState, useEffect } from 'react';
import Select, { createFilter } from 'react-select'
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

import Table from './Table'
import { DateTimeRangeComponent } from '../../components/Form'
import AllResultHeader from './Header/AllResult'
import AreaHeader from './Header/Area'
import ProfileHeader from './Header/Profile'

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

  const TableSelected = {
    0: <Table filter={filterResult} headers={AllResultHeader()} />,
    1: <Table filter={filterResult} headers={AreaHeader()} />,
    2: <Table filter={filterResult} headers={ProfileHeader()} />
  };

  useEffect(() => {
    fetch('/data/province.json')
      .then((res) => res.json())
      .then((data) => {
        let newProvinces = Object.keys(data).map((k) => data[k])
        newProvinces.map((province, key) => {
          province.value = key + 1
          province.label = province.name.th
          delete province.name;
        })
        newProvinces = [{ value: 0, label: "ทุกจังหวัด" }, ...newProvinces]
        console.log(newProvinces)
        setProvinces(newProvinces);
      });
  }, [])

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

    let filters = []
    if (startDateTime && endDateTime) {
      if (province && province !== 'ทุกจังหวัด') {
        filters = data.filter((value) => checkStartToEnd(value, startDateTime, endDateTime) && checkProvince(value, province))
      } else {
        filters = data.filter((value) => checkStartToEnd(value, startDateTime, endDateTime))
      }
    }
    setFilterResult(filters)
  }

  const changeProvince = e => {
    let province = e ? e.label : 'ทุกจังหวัด'
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
  return (
    <section>
      <h1>Covid</h1>
      <div className="format-select">
        <label id="select-province" >จังหวัด</label>
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
      <DateTimeRangeComponent
        datetime={stateFilter}
        changeStartDate={changeStartDate}
        changeStartTime={changeStartTime}
        changeEndDate={changeEndDate}
        changeEndTime={changeEndTime}
      />
      <div>
        <button onClick={() => search()}>ค้นหา</button>
      </div>
      <div>
        <button onClick={() => setGroupColumn(0)}>ข้อมูลทั้งหมด</button>
        <button onClick={() => setGroupColumn(1)}>ข้อมูลบุคคล</button>
        <button onClick={() => setGroupColumn(2)}>ข้อมูลพื้นที่</button>
      </div>
      {
        filterResult.length === 0 ? '' : TableSelected[group]
      }
    </section>
  )
}

export default Covid;
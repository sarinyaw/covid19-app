import React from "react";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import TimePicker from 'react-time-picker/dist/entry.nostyle'
import styles from '../../../styles/components/DateTimeRange.module.scss'

const DateTimeRangeComponent = ({ datetime, changeStartDate, changeStartTime, changeEndDate, changeEndTime }) => {
  let { startDate, startTime, endDate, endTime } = datetime
  return (
    <div>
      <div className="format-picker">
        <label id="start-date">เริ่มต้น</label>
        <DatePicker
          onChange={changeStartDate}
          value={startDate}
          locale="th-TH"
          format="dd/MM/y"
          required={true}
        />
        <TimePicker
          onChange={changeStartTime}
          value={startTime}
          format="HH:mm"
          disableClock={true}
          required={true}
        />
      </div>
      <div className="format-picker">
        <label id="end-date">สิ้นสุด</label>
        <DatePicker
          onChange={changeEndDate}
          value={endDate}
          locale="th-TH"
          format="dd/MM/y"
          required={true}
        />
        <TimePicker
          onChange={changeEndTime}
          value={endTime}
          format="HH:mm"
          disableClock={true}
          required={true}
        />
      </div>
    </div >
  );
};

export default DateTimeRangeComponent;
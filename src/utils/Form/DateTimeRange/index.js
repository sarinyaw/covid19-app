import React from "react";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import TimePicker from 'react-time-picker/dist/entry.nostyle'
import styles from '../../../styles/utils/DateTimeRange.module.scss'
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'

const DateTimeRangeComponent = ({ datetime, changeStartDate, changeStartTime, changeEndDate, changeEndTime }) => {
  let { startDate, startTime, endDate, endTime } = datetime
  dayjs.extend(buddhistEra)
  let startYear = dayjs(startDate).format('BBBB')
  let endYear = dayjs(endDate).format('BBBB')
  return (
    <div>
      <div className="format-picker">
        <label id="start-date">เริ่มต้น</label>
        <DatePicker
          className={styles.picker}
          onChange={changeStartDate}
          value={startDate}
          locale="th-TH"
          format={`dd/MM/${startYear}`}
          required={true}
        />
        <TimePicker
          className={styles.picker}
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
          className={styles.picker}
          onChange={changeEndDate}
          value={endDate}
          locale="th-TH"
          format={`dd/MM/${endYear}`}
          required={true}
        />
        <TimePicker
          className={styles.picker}
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
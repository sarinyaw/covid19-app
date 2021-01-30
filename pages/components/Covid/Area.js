import React, { useState, useEffect } from 'react';

const Area = ({ covid }) => {
  return (
    <table>
      <thead>
        <tr>
        <th>วันที่ยืนยัน</th>
          <th>No</th>
          <th>จังหวัด</th>
          <th>Province</th>
          <th>อำเภอ</th>
          <th>รายละเอียด</th>
          <th>กักตัว</th>
        </tr>
      </thead>
      <tbody>
        {
          covid.map((value, key) => {
            return (
              <tr key={key}>
                <td>{value.ConfirmDateBud}</td>
                <td>{value.No}</td>
                <td>{value.Province}</td>
                <td>{value.ProvinceEn}</td>
                <td>{value.ProvinceId}</td>
                <td>{value.District}</td>
                <td>{value.Detail}</td>
                <td>{value.StatQuarantine}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default Area;
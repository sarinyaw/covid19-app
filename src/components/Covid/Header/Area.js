const headers = () => [
  {
    name: 'หมายเลข',
    field: 'No',
    sortable: true,
    align: 'start',
  },
  {
    name: 'วันที่ยืนยัน',
    field: 'ConfirmDateBud',
    sortable: true,
    align: 'start',
  },
  {
    name: 'จังหวัด',
    field: 'Province',
    sortable: true,
    align: 'start',
  },
  {
    name: 'Province',
    field: 'ProvinceEn',
    sortable: true,
    align: 'start',
  },
  {
    name: 'อำเภอ/แขวง',
    field: 'District',
    sortable: true,
    align: 'start',
  }
];

export default headers;
import provinces from '../json/province.json'

export default (req, res) => {
  res.statusCode = 200
  let newProvinces = Object.keys(provinces).map((k) => provinces[k])
  newProvinces.map((province, key) => {
    province.value = key + 1
    province.label = province.name.th
    delete province.name;
  })
  res.json(newProvinces)
}

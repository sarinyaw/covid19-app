import provinces from '../json/provinces.json'

export default (req, res) => {
  res.statusCode = 200
  res.json(provinces)
}
import cases from '../json/cases.json'

export default (req, res) => {
  res.statusCode = 200
  res.json(cases)
}
import cases from '../json/covid-case.json'

export default (req, res) => {
  res.statusCode = 200
  res.json(cases)
}

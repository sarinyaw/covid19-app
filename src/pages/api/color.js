import colors from '../json/colors.json'

export default (req, res) => {
  res.statusCode = 200
  res.json(colors)
}
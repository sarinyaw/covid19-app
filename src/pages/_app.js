import '../styles/app.scss'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

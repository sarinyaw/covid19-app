import Covid from './Covid'
import Head from 'next/head'
import styles from '../styles/pages/Home.module.scss'

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Covid19 App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600&display=swap" rel="stylesheet"></link>
        <link href="/assets/vendor/fontawesome-free-5.15.2-web/css/all.css" rel="stylesheet"></link>
      </Head>
      <main className={styles.main}>
        <Covid />
      </main>
    </div>
  )
}

export default Home
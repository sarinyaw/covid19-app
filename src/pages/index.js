import Covid from './Covid'
import Head from 'next/head'
import styles from '../styles/pages/Home.module.scss'

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Covid19 App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600&display=swap" rel="stylesheet"></link>
        <link href="/assets/vendor/fontawesome-free-5.15.2-web/css/all.css" rel="stylesheet"></link>
      </Head>

      <main className={styles.main}>
        <Covid />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export default Home
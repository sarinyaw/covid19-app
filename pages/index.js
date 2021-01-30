import Covid from './components/Covid'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Covid19 App</title>
        <link rel="icon" href="/favicon.ico" />
        
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
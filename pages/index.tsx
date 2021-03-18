import styles from './index.module.scss'
import RouletteGame from "containers/roulette-game";

const IndexPage = () =>
  <div className={styles.container}>
    <main className={styles.main}>
      <h1 className={styles.title}>
        Simple Roulette game - test your luck!
      </h1>

      <RouletteGame/>

    </main>

    <footer className={styles.footer}>
      <p>16bit recruitment task - made by Marcin Piniarski</p>
    </footer>
  </div>

export default IndexPage

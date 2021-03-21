import styles from "./roulette-wheel.module.scss"


const RouletteWheelLoader = () =>
  <div className={styles.loader} data-testid="RouletteWheelLoader">
    <p>Loading...</p>
    <img src={"images/wheel.png"} alt={"Roulette wheel"}/>
  </div>


export default RouletteWheelLoader
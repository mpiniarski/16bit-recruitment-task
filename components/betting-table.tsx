import {ResultColor} from "pages/api/random-result";
import {Bet} from "containers/roulette-game";
import styles from "./betting-table.module.scss"

const BettingTable = ({currentBet, onBet, uiBlocked}: {
  currentBet: Bet,
  onBet: (bet: Bet) => void,
  uiBlocked: boolean
}) =>
  <div className={`${styles.container}`}>
    <h1>Choose your bet:</h1>
    <div className={`${styles.betButtons}`}>
      <div
        className={`${styles.button} ${styles.red} ${currentBet.color === ResultColor.RED ? styles.bet : ""} ${uiBlocked ? styles.disabled : ""}`}
        onClick={() => !uiBlocked && onBet({
          color: ResultColor.RED
        })}/>
      <div
        className={`${styles.button} ${styles.black} ${currentBet.color === ResultColor.BLACK ? styles.bet : ""} ${uiBlocked ? styles.disabled : ""}`}
        onClick={() => !uiBlocked && onBet({
          color: ResultColor.BLACK
        })}/>
    </div>
  </div>
export default BettingTable
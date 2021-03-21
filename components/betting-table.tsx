import {ResultColor} from "pages/api/random-result";
import {Bet} from "containers/roulette-game";
import styles from "./betting-table.module.scss"

const BettingTable = ({currentBet, onBet, uiBlocked}: {
  currentBet: Bet,
  onBet: (bet: Bet) => void,
  uiBlocked: boolean
}) =>
  <div data-testid="BettingTable"className={`${styles.container}`}>
    <h1>Choose your bet:</h1>
    <div className={`${styles.betButtons}`}>
      <div
        data-testid="Red"
        className={`${styles.button} ${styles.red} ${currentBet.color === ResultColor.RED ? styles.bet : ""} ${uiBlocked ? styles.disabled : ""}`}
        onClick={() => !uiBlocked && onBet({
          color: ResultColor.RED
        })}/>
      <div
        data-testid="Black"
        className={`${styles.button} ${styles.black} ${currentBet.color === ResultColor.BLACK ? styles.bet : ""} ${uiBlocked ? styles.disabled : ""}`}
        onClick={() => !uiBlocked && onBet({
          color: ResultColor.BLACK
        })}/>
    </div>
  </div>
export default BettingTable
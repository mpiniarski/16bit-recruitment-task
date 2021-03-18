import {ResultColor} from "pages/api/random-result";
import {Bet} from "containers/roulette-game";

const BettingTable = ({currentBet, onBet}: { currentBet: Bet, onBet: (bet: Bet) => void }) => <>
  <button disabled={currentBet.color === ResultColor.RED} type={"button"} onClick={() => onBet({
    color: ResultColor.RED
  })}>RED
  </button>
  <button disabled={currentBet.color === ResultColor.BLACK} type={"button"} onClick={() => onBet({
    color: ResultColor.BLACK
  })}>BLACK
  </button>
</>

export default BettingTable
import styles from "./bet-results.module.scss";
import Color from "components/color";
import {BetResult} from "containers/roulette-game";

const BetResults = ({betResults}: { betResults: BetResult[] }) => <div>
  <h2 className={styles.header}>Previous results:</h2>
  {
    betResults.map((betResult, index) =>
      <p className={styles.betResult + " " + (index === 0 ? styles.last : "")}>
        {betResult.spinResult.color === betResult.bet.color
          ? <>
            <span>Success! It was </span>
            <Color value={betResult.spinResult.color}/>
            <span> indeed. :-)</span>
          </>
          : <>
            <span>Failure! You've bet on </span>
            <Color value={betResult.bet.color}/>
            <span>, but it was </span>
            <Color value={betResult.spinResult.color}/>
            <span>. ;-(</span>
          </>
        }
      </p>)
  }
</div>

export default BetResults
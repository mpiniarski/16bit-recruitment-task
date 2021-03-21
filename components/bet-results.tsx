import styles from "./bet-results.module.scss";
import Color from "components/color";
import {BetResult} from "containers/roulette-game";

const BetResults = ({betResults}: { betResults: BetResult[] }) => <div data-testid="BetResults">
  <h2 className={styles.header}>Previous results:</h2>
  {
    betResults.map((betResult, index) =>
      <p
        data-testid="BetResult"
        className={styles.betResult + " " + (index === 0 ? styles.last : "")}
      >
        {betResult.spinResult.color === betResult.bet.color
          ?
          <span data-testid="Success">
            <span>Success! It was </span>
            <Color value={betResult.spinResult.color}/>
            <span> indeed. :-)</span>
          </span>
          :
          <span data-testid="Failure">
            <span>Failure! You've bet on </span>
            <Color value={betResult.bet.color}/>
            <span>, but it was </span>
            <Color value={betResult.spinResult.color}/>
            <span>. ;-(</span>
          </span>
        }
      </p>)
  }
</div>

export default BetResults
import {useState} from "react";
import {Result as SpinResult, ResultColor} from "pages/api/random-result";
import {useStorageState} from "react-storage-hooks";
import {isBrowser, randomEvenInt, randomOddInt, serverSideStorage} from "utils";
import axios from "axios";
import BettingTable from "components/betting-table";
import BetResults from "components/bet-results";
import dynamic from "next/dynamic";
import styles from "./roulette-game.module.css"
import RouletteWheelLoader from "components/roulette-wheel.loader";

const RouletteWheel = dynamic(
  () => import("components/roulette-wheel"),
  {
    ssr: false,
    loading: ()=> <RouletteWheelLoader/>
  }
);

// This type can be easily extended in the future e.g. to add betting on numbers, lows, highs, columns etc.
// I assumed that in this simple roulette one can only bet on either black or red
export type Bet = {
  readonly color?: ResultColor
}
export type BetResult = {
  readonly bet: Required<Bet>,
  readonly spinResult: SpinResult,
}

const RouletteGame = () => {
  const [bet, setBet] = useState<Bet>({})
  const [spinResult, setSpinResult] = useState<SpinResult>()
  const [prevBetResults, setPrevBetResults] = useStorageState<BetResult[]>(
    isBrowser() ? sessionStorage : serverSideStorage,
    'user-results',
    []
  );
  const [uiBlocked, setUiBlocked] = useState<boolean>(false)

  const spin = async () => {
    setSpinResult(undefined)
    if (bet.color === undefined) throw Error("Invalid state")

    const response = await axios.get<SpinResult>('api/random-result');
    setSpinResult(response.data)
  }

  return <div className={styles.container}>
    <main className={styles.main}>
      <RouletteWheel
        result={spinResult?.color}
        onSpin={spin}
        canSpin={bet.color !== undefined && !uiBlocked}
        onAnimationStart={() => {
          setUiBlocked(true)
        }}
        onAnimationEnd={() => {
          if (bet.color !== undefined && spinResult !== undefined) {
            setUiBlocked(false)
            setPrevBetResults([
              {bet: {color: bet.color}, spinResult: spinResult},
              ...prevBetResults.slice(0, 8)]
            )
          }
        }}
      />
      <BettingTable
        currentBet={bet}
        onBet={(bet) => setBet(bet)}
        uiBlocked={uiBlocked}
      />
    </main>

    <aside className={styles.aside}>
      <BetResults betResults={prevBetResults}/>
    </aside>
  </div>;
};

export default RouletteGame
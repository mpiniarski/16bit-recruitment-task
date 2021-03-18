import {useState} from "react";
import {Result as SpinResult, ResultColor} from "pages/api/random-result";
import {useStorageState} from "react-storage-hooks";
import {isBrowser, serverSideStorage} from "utils";
import axios from "axios";
import RouletteWheel from "components/roulette-wheel";
import BettingTable from "components/betting-table";
import BetResults from "components/bet-results";

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
  const [betResults, setBetResults] = useStorageState<BetResult[]>(
    isBrowser() ? sessionStorage : serverSideStorage,
    'user-results',
    []
  );

  const spin = async () => {
    if (bet.color === undefined) throw Error("Invalid state")

    const response = await axios.get<SpinResult>('api/random-result');
    setSpinResult(response.data)

    setBetResults([{bet: {color: bet.color}, spinResult: response.data}, ...betResults.slice(0, 8)])
    setBet({})
  }

  return <>
    <RouletteWheel
      result={spinResult?.color}
      onSpin={spin}
      canSpin={bet.color === undefined}
    />

    <BettingTable currentBet={bet} onBet={(bet) => setBet(bet)}/>

    <BetResults betResults={betResults}/>
  </>;
};

export default RouletteGame
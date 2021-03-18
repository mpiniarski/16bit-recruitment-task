import styles from './index.module.scss'
import RouletteWheel from "components/roulette-wheel";
import {RandomResult, ResultColor} from "pages/api/random-result";
import {useState} from "react";

type UserBet = {
  color?: ResultColor
}

const IndexPage = () => {

  const [userBet, setUserBet] = useState<UserBet>({})
  const [result, setResult] = useState<RandomResult>()
  const [userResults, setUserResults] = useState<boolean[]>([])

  const spin = () => {
    console.log("dupa")
    if (userBet.color === undefined) throw Error("Invalid state")

    // TODO API call
    let newResult = {color: ResultColor.BLACK};
    setResult(newResult)

    setUserResults([newResult.color === userBet.color, ...userResults.slice(0,8)])

    setUserBet({})
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Simple Roulette game - test your luck!
        </h1>

        <RouletteWheel
          result={result?.color}
        />
        <button disabled={userBet.color === undefined} type={"button"} onClick={spin}>Spin the wheel</button>

        <button type={"button"} onClick={() => setUserBet({color: ResultColor.RED})}>RED</button>
        <button type={"button"} onClick={() => setUserBet({color: ResultColor.BLACK})}>BLACK</button>

        <div>
          <h2>Previous results:</h2>
          {
            userResults.map((userResult, index) =>
              <p className={styles.userResult + " " + (index === 0 ? styles.last : "")}>{userResult ? "Success!" : "Failure :-("}</p>)
          }


        </div>
      </main>

      <footer className={styles.footer}>
        <p>16bit recruitment task - made by Marcin Piniarski</p>
      </footer>
    </div>
  )
}

export default IndexPage

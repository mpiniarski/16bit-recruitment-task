import {ResultColor} from "pages/api/random-result";

const RouletteWheel = ({result, onSpin, canSpin}: { result?: ResultColor, onSpin: ()=>void, canSpin: boolean /*onAnimationStart, onAnimationEnd*/ }) => {

  return (
    <div>
      {result === undefined
        ? <p>Spin the wheel</p>
        : <p>Result: {result === ResultColor.RED ? "RED" : "BLACK"}</p>
      }
      <button disabled={canSpin} type={"button"} onClick={onSpin}>Spin the wheel</button>
    </div>
  )
}

export default RouletteWheel
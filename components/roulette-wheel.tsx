import {ResultColor} from "pages/api/random-result";

const RouletteWheel = ({result}: { result?: ResultColor, /*onAnimationStart, onAnimationEnd*/ }) => {

  return (
    <div>
      {result === undefined
        ? <p>Spin the wheel</p>
        : <p>Result: {result === ResultColor.RED ? "RED" : "BLACK"}</p>
      }
    </div>
  )
}

export default RouletteWheel
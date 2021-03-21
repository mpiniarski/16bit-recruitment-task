import {ResultColor} from "pages/api/random-result";
import {useEffect, useRef, useState} from "react";
import {DisplayElements, setUp, spin} from "components/roulette-wheel.animation";
import styles from "./roulette-wheel.module.css"


//Only suitable to use in a browser
const RouletteWheel = ({result, onSpin, canSpin, onAnimationStart, onAnimationEnd}: {
  result?: ResultColor,
  onSpin: () => void,
  canSpin: boolean,
  onAnimationStart: () => void,
  onAnimationEnd: () => void
}) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const [displayElements, setDisplayElements] = useState<DisplayElements | undefined>()

  useEffect(() => {
    const displayElements = setUp();
    canvasContainerRef.current?.appendChild(displayElements.app.view)
    setDisplayElements(displayElements)
    return () => {
      canvasContainerRef.current?.removeChild(displayElements.app.view)
    }
  }, [])

  useEffect(() => {
    if (displayElements !== undefined) {
      if(canSpin && result === undefined) {
        displayElements.spinText.text = "Spin!"
      }
    }
  }, [displayElements, canSpin, result])

  useEffect(() => {
    if (result !== undefined && displayElements !== undefined) {
      spin(
        displayElements,
        result,
        onAnimationStart,
        onAnimationEnd
      )
    }
  }, [result, displayElements])

  return (<>
    <div
      className={`${canSpin ? styles.enabled : ""}`}
      onClick={() => canSpin && onSpin()}
      ref={canvasContainerRef}/>
  </>)
}

export default RouletteWheel

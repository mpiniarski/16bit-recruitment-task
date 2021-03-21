import {ResultColor} from "pages/api/random-result";
import {useEffect, useRef, useState} from "react";
import {DisplayElements, setUp, spin} from "components/roulette-wheel.animation";
import styles from "./roulette-wheel.module.css"
import RouletteWheelLoader from "components/roulette-wheel.loader";


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
  const [tutorialPhase, setTutorialPhase] = useState<boolean>(true)

  useEffect(() => {
    const displayElements = setUp();
    canvasContainerRef.current?.appendChild(displayElements.app.view)
    // Timeout for rendering
    setTimeout(() => {
      setDisplayElements(displayElements)
    }, 800)
    return () => {
      canvasContainerRef.current?.removeChild(displayElements.app.view)
    }
  }, [])

  useEffect(() => {
    if (result !== undefined && displayElements !== undefined) {
      spin(
        displayElements,
        result,
        onAnimationStart,
        onAnimationEnd
      )
    }
  }, [result])

  useEffect(() => {
    if (tutorialPhase && displayElements !== undefined) {
      if (!canSpin) {
        displayElements.spinText.text = "Bet!"
      } else if (canSpin && result === undefined) {
        displayElements.spinText.text = "Spin!"
      }
    }
  }, [displayElements, tutorialPhase, canSpin, result])

  debugger
  return <>
    {
      displayElements === undefined &&
      <RouletteWheelLoader/>
    }
    <div
      className={`${styles.canvasContainer} ${displayElements !== undefined ? styles.visible : ""} ${canSpin ? styles.enabled : ""}`}
      onClick={() => {
        if (canSpin) {
          setTutorialPhase(false);
          onSpin();
        }
      }}
      ref={canvasContainerRef}/>
  </>

}

export default RouletteWheel

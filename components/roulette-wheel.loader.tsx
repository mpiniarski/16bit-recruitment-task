import {ResultColor} from "pages/api/random-result";
import {useEffect, useRef, useState} from "react";
import {DisplayElements, setUp, spin} from "components/roulette-wheel.animation";
import styles from "./roulette-wheel.module.css"


const RouletteWheelLoader = () =>
  <img className={styles.loader} src={"images/wheel.png"} alt={"Roulette wheel"}/>

export default RouletteWheelLoader
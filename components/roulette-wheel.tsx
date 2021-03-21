import {ResultColor} from "pages/api/random-result";
import {useEffect, useRef, useState} from "react";
import * as PIXI from "pixi.js"
import PixiPlugin from "gsap/PixiPlugin";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import {gsap} from "gsap";
import {randomEvenInt, randomInt, randomOddInt} from "utils";

function multiplyArray<T>(array: T[], times: number): T[] {
  const result = []
  for (let i = 0; i < times; i++) {
    result.push(...array)
  }
  return result
}

type Point2D = { x: number, y: number }

//Only suitable to use in a browser
const RouletteWheel = ({result, onSpin, canSpin}: {
  result?: ResultColor,
  onSpin: () => void,
  canSpin: boolean /*onAnimationStart, onAnimationEnd*/
}) => {
  const ref = useRef<HTMLDivElement>(null)

  let [stage, setStage] = useState<PIXI.Container | undefined>()
  let [wheel, setWheel] = useState<PIXI.Sprite | undefined>()
  let [ball, setBall] = useState<PIXI.Sprite | undefined>()

  const initialWheelRotation = -2 * Math.PI / 37 / 2;
  useEffect(() => {
    gsap.registerPlugin(PixiPlugin, MotionPathPlugin);
    PixiPlugin.registerPIXI(PIXI);

    let app = new PIXI.Application({
        width: 512,
        height: 512,
        antialias: true,
        transparent: true,
        resolution: 1
      }
    );

    ref.current?.appendChild(app.view)

    setStage(app.stage)

    const wheel = PIXI.Sprite.from("images/wheel.png");
    app.stage.x = app.screen.width / 2;
    app.stage.y = app.screen.height / 2;
    app.stage.pivot.x = app.screen.width / 2;

    app.stage.pivot.y = app.screen.width / 2;
    wheel.x = app.renderer.width / 2;
    wheel.y = app.renderer.height / 2;
    wheel.rotation = initialWheelRotation;
    wheel.anchor.x = 0.5;
    wheel.anchor.y = 0.5;
    app.stage.addChild(wheel);
    setWheel(wheel)

    const ball = PIXI.Sprite.from("images/ball.png");
    ball.scale.x = 0.02
    ball.scale.y = 0.02
    ball.x = app.renderer.width / 2;
    ball.y = ball.height / 2;
    ball.anchor.x = 0.5;
    ball.anchor.y = 0.5;
    app.stage.addChild(ball);
    setBall(ball)

    return () => {
      ref.current?.removeChild(app.view)
    }
  }, [])


  useEffect(() => {
    result !== undefined && spin(result)
  }, [result])

  const spin = (color: ResultColor) => {
    if (wheel === undefined || ball === undefined || stage === undefined) throw Error("Invalid state")

    const resultNumber = color === ResultColor.BLACK
      ? randomEvenInt(1, 37)
      : randomOddInt(1, 37)

    console.log(resultNumber)

    const cellAngle = 360 / 37

    const finalAngle = cellAngle * resultNumber

    const wheelTimeline = gsap.timeline();
    const wheelShiftAnge = 2 * cellAngle;
    const currentWheelRotation = (wheel.rotation - initialWheelRotation) / (2 * Math.PI) * 360 % 360;

    wheelTimeline.to(wheel, {duration: 1, pixi: {rotation: `-=${wheelShiftAnge}`}})
    wheelTimeline.to(wheel, {
      duration: 5,
      pixi: {rotation: `+=${((360 - currentWheelRotation) + wheelShiftAnge + (360 - finalAngle))}`},
      ease: "power2"
    })
    wheelTimeline.to(stage, {duration: 3, pixi: {rotation: randomInt(0, 360)}, delay: -4})

    const ballTimeline = gsap.timeline();
    const circularPath = (center: Point2D, radius: number) => [
      {x: center.x + radius, y: center.y},
      {x: center.x, y: center.y + radius},
      {x: center.x - radius, y: center.y},
      {x: center.x, y: center.y - radius}
    ];
    const center = {x: 256, y: 256};
    const baseRadius = 256 - ball.height / 2;
    ballTimeline.to(ball, {
      duration: 7,
      motionPath: {
        path: [
          ...circularPath(center, baseRadius),
          ...circularPath(center, baseRadius - 5),
          ...circularPath(center, baseRadius - 11),
          ...circularPath(center, baseRadius - 14).slice(0, -1),
          {x: center.x + 5, y: center.y - baseRadius + 65},
          {x: center.x - 5, y: center.y - baseRadius + 75},
          {x: center.x + 2, y: center.y - baseRadius + 84},
          {x: center.x - 1, y: center.y - baseRadius + 90},
        ],
        alignOrigin: [0.5, 0.5],
        curviness: 0.8
      },
      ease: 'power2'
    })
  }

  return (<>
    <div ref={ref}/>
    <div>
      {result === undefined
        ? <p>Spin the wheel</p>
        : <p>Result: {result === ResultColor.RED ? "RED" : "BLACK"}</p>
      }
      <button disabled={canSpin} type={"button"} onClick={() => {
        onSpin();
      }}>Spin the wheel
      </button>
    </div>
  </>)
}

export default RouletteWheel

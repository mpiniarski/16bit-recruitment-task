import {gsap} from "gsap";
import PixiPlugin from "gsap/PixiPlugin";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import * as PIXI from "pixi.js";
import {ResultColor} from "pages/api/random-result";
import {randomEvenInt, randomInt, randomOddInt} from "utils";

gsap.registerPlugin(PixiPlugin, MotionPathPlugin);
PixiPlugin.registerPIXI(PIXI);

type Point2D = { x: number, y: number }

export type DisplayElements = {
  app: PIXI.Application,
  rouletteContainer: PIXI.Container,
  wheel: PIXI.Sprite,
  ball: PIXI.Sprite,
  spinText: PIXI.Text
}

const initialWheelRotation = -2 * Math.PI / 37 / 2;
const cellAngle = 360 / 37


export const setUp = (): DisplayElements => {
  const app = new PIXI.Application({
    width: 512,
    height: 512,
    antialias: true,
    transparent: true,
    resolution: 1
  });

  const rouletteContainer = new PIXI.Container();
  rouletteContainer.x = app.screen.width / 2;
  rouletteContainer.y = app.screen.height / 2;
  rouletteContainer.pivot.x = app.screen.width / 2;
  rouletteContainer.pivot.y = app.screen.width / 2;

  app.stage.addChild(rouletteContainer)

  const wheel = PIXI.Sprite.from("images/wheel.png");
  wheel.x = app.renderer.width / 2;
  wheel.y = app.renderer.height / 2;
  wheel.rotation = initialWheelRotation;
  wheel.anchor.x = 0.5;
  wheel.anchor.y = 0.5;
  rouletteContainer.addChild(wheel);

  const ball = PIXI.Sprite.from("images/ball.png");
  ball.anchor.x = 0.5;
  ball.anchor.y = 0.5;
  ball.x = app.renderer.width / 2;
  ball.y = 20;
  rouletteContainer.addChild(ball);

  const spinText = new PIXI.Text(
    'Bet!',
    {fontFamily: 'Arial', fontSize: 60, fill: "white", dropShadow: true, fontWeight: "bold", align: 'center'}
  );
  spinText.x = app.renderer.width / 2;
  spinText.y = app.renderer.height / 2;
  spinText.anchor.x = 0.5;
  spinText.anchor.y = 0.5;


  app.stage.addChild(spinText);

  gsap.to(spinText, {duration: 1, pixi: {scale: 1.5}, repeat: -1, yoyo: true})

  return {
    app: app,
    rouletteContainer: rouletteContainer,
    wheel: wheel,
    ball: ball,
    spinText: spinText
  }
};

export const spin = (
  {app, rouletteContainer, wheel, ball, spinText}: DisplayElements,
  color: ResultColor,
  onStart: () => void,
  onEnd: () => void
) => {
  const resultNumber = color === ResultColor.BLACK
    ? randomEvenInt(1, 37)
    : randomOddInt(1, 37)

  const finalAngle = cellAngle * resultNumber;
  const wheelShiftAnge = 2 * cellAngle;
  const currentWheelRotation = (wheel.rotation - initialWheelRotation) / (2 * Math.PI) * 360 % 360;

  const wheelTimeline = gsap.timeline();
  wheelTimeline.to(wheel, {
    duration: 1,
    pixi: {rotation: `-=${wheelShiftAnge}`}
  })
  wheelTimeline.to(wheel, {
    duration: 5,
    pixi: {rotation: `+=${((360 - currentWheelRotation) + wheelShiftAnge + (360 - finalAngle))}`},
    ease: "power2"
  })
  wheelTimeline.to(rouletteContainer, {
    duration: 3,
    pixi: {rotation: randomInt(0, 360)},
    delay: -4
  })


  const circularPath = (center: Point2D, radius: number) => [
    {x: center.x + radius, y: center.y},
    {x: center.x, y: center.y + radius},
    {x: center.x - radius, y: center.y},
    {x: center.x, y: center.y - radius}
  ];
  const center = {x: app.renderer.width / 2, y: app.renderer.height / 2};
  const baseRadius = app.renderer.height / 2 - ball.height / 2;

  const ballTimeline = gsap.timeline();
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
      curviness: 0.8,

    },
    onStart: () => {
      spinText.text = ""
      onStart();
    },
    onComplete: () => {
      spinText.text = color === ResultColor.BLACK ? "Black!" : "Red!"
      onEnd();
    },
    ease: 'power2'
  })
}

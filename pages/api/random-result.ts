import {NextApiRequest, NextApiResponse} from "next";

export enum ResultColor {
  RED, BLACK
}

export type RandomResult = {
  readonly color: ResultColor
}

const handler = (req: NextApiRequest, res: NextApiResponse<RandomResult>) => {
  res
    .status(200)
    .json({ color: randomInt(0,1)  })
};

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export default handler

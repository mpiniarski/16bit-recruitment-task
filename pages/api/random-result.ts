import {NextApiRequest, NextApiResponse} from "next";

export enum ResultColor {
  RED, BLACK
}

export type Result = {
  readonly color: ResultColor
}

const handler = (req: NextApiRequest, res: NextApiResponse<Result>) => {
  if (req.method === 'GET') {
    res
      .status(200)
      .json({ color: randomInt(0,1)  })
  } else {
    res.status(405).end()
  }

};

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export default handler

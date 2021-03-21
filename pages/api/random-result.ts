import {NextApiRequest, NextApiResponse} from "next";
import {randomInt} from "utils";

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

export default handler

import { NextApiRequest, NextApiResponse } from "next";
import Products from "../../../../database.json"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query

  const product = Products.find(product => product.slug === slug?.toString())

  res.status(200).json(product)
}
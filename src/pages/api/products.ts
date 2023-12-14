import { NextApiRequest, NextApiResponse } from "next";
import Products from "../../../database.json"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(Products)
}
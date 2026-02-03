import type { NextApiRequest, NextApiResponse } from "next";
import { PROPERTYLISTINGSAMPLE } from "@/constants";
import { PropertyProps } from "@/interfaces";

type ResponseData = PropertyProps[] | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      // Return the sample properties data
      res.status(200).json(PROPERTYLISTINGSAMPLE);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

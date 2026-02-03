import type { NextApiRequest, NextApiResponse } from "next";
import { PROPERTYLISTINGSAMPLE } from "@/constants";
import { PropertyProps } from "@/interfaces";

type ResponseData = PropertyProps | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      // Find the property by ID
      const propertyId = parseInt(id as string);
      const property = PROPERTYLISTINGSAMPLE[propertyId];

      if (!property) {
        res.status(404).json({ message: "Property not found" });
        return;
      }

      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property details" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

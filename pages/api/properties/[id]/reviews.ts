import type { NextApiRequest, NextApiResponse } from "next";
import { REVIEWS_SAMPLE } from "@/constants";
import { ReviewProps } from "@/interfaces";

type ResponseData = ReviewProps[] | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      // Handle id as either string or array
      const idValue = Array.isArray(id) ? id[0] : id;
      
      // Parse the property ID
      const propertyId = parseInt(idValue as string);

      if (isNaN(propertyId)) {
        res.status(400).json({ message: "Invalid property ID" });
        return;
      }

      // Get reviews for the property
      const reviews = REVIEWS_SAMPLE[propertyId as keyof typeof REVIEWS_SAMPLE] || [];

      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}


import type { NextApiRequest, NextApiResponse } from "next";

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

type ResponseData =
  | { message: string; bookingId?: string }
  | { errors: { [key: string]: string } };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    try {
      const bookingData: BookingData = req.body;

      // Validate required fields
      const errors: { [key: string]: string } = {};

      if (!bookingData.firstName?.trim()) {
        errors.firstName = "First name is required";
      }
      if (!bookingData.lastName?.trim()) {
        errors.lastName = "Last name is required";
      }
      if (!bookingData.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.email = "Valid email is required";
      }
      if (!bookingData.phoneNumber?.match(/^\d{10,}$/)) {
        errors.phoneNumber = "Valid phone number is required";
      }
      if (!bookingData.cardNumber?.match(/^\d{13,19}$/)) {
        errors.cardNumber = "Valid card number is required";
      }
      if (!bookingData.expirationDate?.match(/^\d{2}\/\d{2}$/)) {
        errors.expirationDate = "Valid expiration date is required";
      }
      if (!bookingData.cvv?.match(/^\d{3,4}$/)) {
        errors.cvv = "Valid CVV is required";
      }
      if (!bookingData.streetAddress?.trim()) {
        errors.streetAddress = "Street address is required";
      }
      if (!bookingData.city?.trim()) {
        errors.city = "City is required";
      }
      if (!bookingData.state?.trim()) {
        errors.state = "State is required";
      }
      if (!bookingData.zipCode?.trim()) {
        errors.zipCode = "Zip code is required";
      }
      if (!bookingData.country?.trim()) {
        errors.country = "Country is required";
      }

      if (Object.keys(errors).length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // In a real application, you would:
      // 1. Process the payment with a payment processor (Stripe, PayPal, etc.)
      // 2. Save the booking to a database
      // 3. Send confirmation emails
      // 4. Generate a booking ID

      // For now, simulate successful booking
      const bookingId = `BK-${Date.now()}`;

      res.status(201).json({
        message: "Booking confirmed successfully!",
        bookingId,
      });
    } catch (error) {
      console.error("Error processing booking:", error);
      res.status(500).json({ message: "Failed to process booking" });
    }
  } else if (req.method === "GET") {
    // Optional: Get booking details
    res.status(200).json({ message: "Use POST to submit a booking" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

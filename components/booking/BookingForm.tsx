import axios from "axios";
import { useState } from "react";

interface FormData {
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

const BookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Valid email is required";
    }
    if (!formData.phoneNumber.match(/^\d{10,}$/)) {
      errors.phoneNumber = "Valid phone number is required";
    }
    if (!formData.cardNumber.match(/^\d{13,19}$/)) {
      errors.cardNumber = "Valid card number is required";
    }
    if (!formData.expirationDate.match(/^\d{2}\/\d{2}$/)) {
      errors.expirationDate = "Format: MM/YY";
    }
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      errors.cvv = "Valid CVV is required";
    }
    if (!formData.streetAddress.trim()) {
      errors.streetAddress = "Street address is required";
    }
    if (!formData.city.trim()) {
      errors.city = "City is required";
    }
    if (!formData.state.trim()) {
      errors.state = "State is required";
    }
    if (!formData.zipCode.trim()) {
      errors.zipCode = "Zip code is required";
    }
    if (!formData.country.trim()) {
      errors.country = "Country is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("/api/bookings", formData);
      setSuccess(true);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });
    } catch (err: any) {
      console.error("Error submitting booking:", err);
      setError(
        err.response?.data?.message ||
          "Failed to submit booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Contact Detail</h2>
      <form onSubmit={handleSubmit}>
        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">
            ✓ Booking confirmed successfully! Check your email for confirmation.
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg">
            ✗ {error}
          </div>
        )}

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`border p-2 w-full mt-2 rounded ${
                validationErrors.firstName ? "border-red-500" : ""
              }`}
            />
            {validationErrors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.firstName}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`border p-2 w-full mt-2 rounded ${
                validationErrors.lastName ? "border-red-500" : ""
              }`}
            />
            {validationErrors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`border p-2 w-full mt-2 rounded ${
                validationErrors.email ? "border-red-500" : ""
              }`}
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`border p-2 w-full mt-2 rounded ${
                validationErrors.phoneNumber ? "border-red-500" : ""
              }`}
              placeholder="1234567890"
            />
            {validationErrors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.phoneNumber}
              </p>
            )}
          </div>
        </div>

        {/* Payment Information */}
        <h2 className="text-xl font-semibold mt-6">Pay with</h2>
        <div className="mt-4">
          <label className="block font-medium">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className={`border p-2 w-full mt-2 rounded ${
              validationErrors.cardNumber ? "border-red-500" : ""
            }`}
            placeholder="1234567890123456"
          />
          {validationErrors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.cardNumber}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium">Expiration Date</label>
            <input
              type="text"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className={`border p-2 w-full mt-2 rounded ${
                validationErrors.expirationDate ? "border-red-500" : ""
              }`}
              placeholder="MM/YY"
            />
            {validationErrors.expirationDate && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.expirationDate}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className={`border p-2 w-full mt-2 rounded ${
                validationErrors.cvv ? "border-red-500" : ""
              }`}
              placeholder="123"
            />
            {validationErrors.cvv && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.cvv}</p>
            )}
          </div>
        </div>

        {/* Billing Address */}
        <h2 className="text-xl font-semibold mt-6">Billing Address</h2>
        <div className="mt-4">
          <label className="block font-medium">Street Address</label>
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            className={`border p-2 w-full mt-2 rounded ${
              validationErrors.streetAddress ? "border-red-500" : ""
            }`}
          />
          {validationErrors.streetAddress && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.streetAddress}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`border p-2 w-full mt-2 rounded ${
                validationErrors.city ? "border-red-500" : ""
              }`}
            />
            {validationErrors.city && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`border p-2 w-full mt-2 rounded ${
                validationErrors.state ? "border-red-500" : ""
              }`}
            />
            {validationErrors.state && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.state}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={`border p-2 w-full mt-2 rounded ${
                validationErrors.zipCode ? "border-red-500" : ""
              }`}
            />
            {validationErrors.zipCode && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.zipCode}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`border p-2 w-full mt-2 rounded ${
                validationErrors.country ? "border-red-500" : ""
              }`}
            />
            {validationErrors.country && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.country}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-md w-full font-semibold transition"
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;

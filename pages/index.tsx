import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { PROPERTYLISTINGSAMPLE } from "../constants";
import { PropertyProps } from "../interfaces";

export default function Home() {
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/properties");
        setProperties(response.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties. Using sample data.");
        // Fallback to sample data on error
        setProperties(PROPERTYLISTINGSAMPLE);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <Head>
        <title>ALX Listing App</title>
        <meta
          name="description"
          content="A small Airbnb-like listing page scaffold"
        />
      </Head>

      <main className="p-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-10 bg-gray-100 p-10 rounded-lg">
          <h1 className="text-4xl font-bold mb-3">
            Find your favorite place here!
          </h1>
          <p className="text-gray-600">
            The best prices for over 2 million properties worldwide.
          </p>
        </section>

        {/* Filters */}
        <section className="flex gap-3 mb-8 overflow-x-auto">
          {["Top Villa", "Self Checkin", "Beachfront", "Pet Friendly"].map(
            (filter) => (
              <Button key={filter} label={filter} />
            )
          )}
        </section>

        {/* Error Message */}
        {error && (
          <section className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg">
            {error}
          </section>
        )}

        {/* Loading State */}
        {loading ? (
          <section className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600 text-lg">Loading properties...</p>
            </div>
          </section>
        ) : (
          /* Listings */
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map(
              ({ name, offers, price, rating, image }: PropertyProps, index) => (
                <Card
                  key={index}
                  title={name}
                  description={`${offers.bed} beds · ${offers.shower} baths`}
                  image={image}
                  price={price}
                  rating={rating}
                />
              )
            )}
          </section>
        )}
      </main>
    </>
  );
}

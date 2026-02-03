import Head from "next/head";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { PROPERTYLISTINGSAMPLE } from "../constants";
import { PropertyProps } from "../interfaces";

export default function Home() {
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

        {/* Listings */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROPERTYLISTINGSAMPLE.map(
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
      </main>
    </>
  );
}

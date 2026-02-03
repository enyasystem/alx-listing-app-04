import { PropertyProps } from "@/interfaces";
import ReviewSection from "./ReviewSection";

interface PropertyDetailProps {
  property: PropertyProps;
  propertyId?: number;
}

const PropertyDetail = ({ property, propertyId = 0 }: PropertyDetailProps) => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Image Section */}
      <div className="mb-8">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      {/* Property Info */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {/* Title and Location */}
          <h1 className="text-4xl font-bold mb-2">{property.name}</h1>
          <p className="text-gray-600 mb-4">
            {property.address.city}, {property.address.state}, {property.address.country}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">⭐</span>
            <span className="text-xl font-semibold">{property.rating}</span>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.category.map((cat, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Offers */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">What this place offers</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-gray-600 text-sm">Beds</p>
                <p className="text-2xl font-bold">{property.offers.bed}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-gray-600 text-sm">Bathrooms</p>
                <p className="text-2xl font-bold">{property.offers.shower}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-gray-600 text-sm">Occupants</p>
                <p className="text-2xl font-bold">{property.offers.occupants}</p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12 border-t pt-8">
            <ReviewSection propertyId={propertyId} />
          </div>
        </div>

        {/* Booking Card */}
        <div className="col-span-1">
          <div className="border rounded-lg p-6 sticky top-6">
            <div className="mb-6">
              <p className="text-gray-600 text-sm">Price per night</p>
              <p className="text-4xl font-bold">${property.price}</p>
              {property.discount > 0 && (
                <p className="text-red-600 text-sm mt-2">
                  Save {property.discount}% on this property
                </p>
              )}
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Reserve
            </button>
            <p className="text-center text-gray-500 text-xs mt-4">
              You won't be charged yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

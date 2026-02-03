import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  image?: string;
  price?: number;
  rating?: number;
  id?: number;
}

const Card = ({ title, description, image, price, rating, id }: CardProps) => {
  const cardContent = (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
      {image && (
        <img
          src={image}
          alt={title}
          className="h-40 w-full object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>

        {(price || rating) && (
          <div className="flex justify-between mt-2 text-sm">
            {price && <span>${price}/night</span>}
            {rating && <span>⭐ {rating}</span>}
          </div>
        )}
      </div>
    </div>
  );

  if (id !== undefined) {
    return <Link href={`/property/${id}`}>{cardContent}</Link>;
  }

  return cardContent;
};

export default Card;

interface CardProps {
  title: string;
  description: string;
  image?: string;
  price?: number;
  rating?: number;
}

const Card = ({ title, description, image, price, rating }: CardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
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
};

export default Card;

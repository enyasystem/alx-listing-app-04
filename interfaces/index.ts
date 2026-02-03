export interface PropertyProps {
  name: string;
  address: {
    state: string;
    city: string;
    country: string;
  };
  rating: number;
  category: string[];
  price: number;
  offers: {
    bed: string;
    shower: string;
    occupants: string;
  };
  image: string;
  discount: number;
}

export interface ReviewProps {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

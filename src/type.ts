export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  category: string;
  description: string;
  id: string;
  image: string;
  price: number;
  rating: Rating;
  title: string;
};

export type ProductProps = {
  id: string;
  sellerId: string;
  category: string;
  title: string;
  price: number;
  quantity: number;
  content: string;
  imageUrls: string[];
  createdAt: string;
};

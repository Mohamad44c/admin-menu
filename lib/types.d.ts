type CategoryType = {
  _id: string;
  title: string;
  products: ProductType[];
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: [CategoryType];
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

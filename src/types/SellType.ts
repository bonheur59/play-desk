export type SellProduct = {
  id: string;
  category: string;
  content: string;
  createdAt: string; // 날짜 형식으로 파싱하여 사용하는 것이 좋습니다.
  imageUrls: string[];
  price: number;
  quantity: number;
  sellerId: string;
  title: string;
  uid: string;
};

export type TableDataItemProps = {
  item: SellProduct;
  index: number;
};

export type CreateProduct = {
  title: "";
  content: "";
  price: 0;
  quantity: 0;
  category: "furniture";
  //   user: UserContextData | null;
  //   imageFiles: Blob[];
  //   prevImg: (string | null)[];
};

export type ProductType = {
  id: string;
  title: string;
  content: string;
  category: string;
  price: number;
  quantity: number;
  sellUid: string;
  createdAt: string;
  files: ImageData[];
};

export type ImageUrlsOnly = ProductType["files"];

export type ImageData = {
  imageFile: string;
};

export type ProductFormProps = {
  isEditing: boolean;
  onSubmitHandler: (data: ProductType) => void;
  defaultValues?: ProductType;
};

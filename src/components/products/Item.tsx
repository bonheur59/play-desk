import { ProductProps } from "@/type";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import CarouselComponent from "../Carousel";

const ProductItem = ({
  title,
  content,
  imageUrls,
  price,
  category,
  id,
}: ProductProps) => {
  const getCategoryKoreanName = (englishCategory) => {
    switch (englishCategory) {
      case "furniture":
        return "가구";
      case "electric":
        return "전자제품";
      case "small-item":
        return "소품";
      // 추가적인 카테고리가 있으면 여기에 계속 추가할 수 있습니다.
      default:
        return englishCategory;
    }
  };

  return (
    <>
      <div className="h-full relative overflow-hidden group rounded">
        <Link to={`/shop/product/${id}`}>
          <CarouselComponent imageUrls={imageUrls} />
          <div className="mt-6">
            <span className="border p-1 border-gray-300  text-gray-400 text-sm  rounded-sm">
              {getCategoryKoreanName(category)}
            </span>
            <p className="mt-3 font-bold truncate">{title}</p>
            <p className="truncate">{content}</p>
            <span>{price}</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductItem;

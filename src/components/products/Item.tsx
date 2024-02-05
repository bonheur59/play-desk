import { ProductProps } from "@/type";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import CarouselComponent from "../Carousel";

const ProductItem = ({
  title,
  content,
  imageUrls,
  price,
  id,
}: ProductProps) => (
  <>
    <div className="h-full relative overflow-hidden group rounded">
      <Link to={`/shop/${id}`}>
        {/* <img
          src={imageUrls}
          className="w-full h-[300px] object-fit object-center"
        /> */}
        <CarouselComponent imageUrls={imageUrls} />
        <div className="mt-6">
          <p className="font-bold truncate">{title}</p>
          <p className="truncate">{content}</p>
          <span>{price}</span>
        </div>
      </Link>
    </div>
  </>
);

export default ProductItem;

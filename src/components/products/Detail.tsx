import { Product, ProductProps } from "@/type";

const ProductDetail = ({
  item: { title, content, imageUrls, price, id },
}: {
  item: ProductProps;
}) => {
  return (
    <>
      <p className="">{title}</p>
      <p className="">{content}</p>
      <img src={imageUrls} className=" object-fit" />
      <span>{price}</span>
    </>
  );
};

export default ProductDetail;

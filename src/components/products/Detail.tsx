import { Product, ProductProps } from "@/type";
import AddToCartButton from "./AddToCartButton";

const ProductDetail = ({
  item,
  // recommendItems,
  paramId,
}: {
  item: ProductProps;
  recommendItems: [];
  paramId: string;
}) => {
  // console.log("추천", recommendItems);
  return (
    <>
      <div className="mt-10 px-48">
        <div className="flex ">
          <div className="w-1/2 flex justify-end">
            <div className="productdisplay-img mr-16">
              <img src={item.imageUrls} alt="" className="w-auto h-[480px] "></img>
            </div>
          </div>
          <div className="w-1/2 flex-col ml-6 ">
            <div className="">{item.category}</div>
            <h1 className="text-[#3d3d3d] text-[40px] ">{item.title}</h1>
            <div className="product-display-right-description">{item.content}</div>
            <div className="mt-4">{item.price}</div>
            {/* <button
              className="py-4 px-14 text-[16px] bg-sky-500 outline-none cursor-pointer rounded-sm text-white mt-10 "
              onClick={() => addToCart(item)}
            >
              장바구니
            </button> */}
            <AddToCartButton items={item} />
          </div>
        </div>
        <div className="px-3 mt-10 flex">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {/* {recommendItems?.map(
              (reProduct) =>
                reProduct.id !== paramId && (
                  <img src={reProduct.imageUrls} className="w-36 " />
                )
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

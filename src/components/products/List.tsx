import React from "react";
import ProductItem from "./Item";
import { Link } from "react-router-dom";

const ProductList = ({ data, category }) => {
  return (
    <>
      <div className="mt-10 mb-20">
        <div className="mb-2 min-h-32 text-zinc-500 text-3xl flex items-end px-10 font-bold">
          {category}
        </div>
        <div className="mb-4 text-right">
          <Link to={`/shop/category/${category}`}>더보기</Link>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {category === "all" ? (
            <>
              {" "}
              {data?.map((product) => (
                <div>
                  <ProductItem {...product} key={product.id} />
                </div>
              ))}
            </>
          ) : (
            <>
              {data?.map(
                (product) =>
                  product.category === category && (
                    <div>
                      <ProductItem {...product} key={product.id} />
                    </div>
                  )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;

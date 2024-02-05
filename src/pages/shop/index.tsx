import { QueryKeys, fetcher } from "@/queryClient";
import { useQuery } from "react-query";
import { Product, ProductProps } from "@/type";
import ProductItem from "@/components/products/Item";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebaseApp";

const fetchProducts = async () => {
  //firebase의 docs를 판매자의 uid에 따라 가져옴
  const productsRef = collection(db, "Product");
  const productQuery = query(productsRef);
  const querySnapshot = await getDocs(productQuery);

  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
};

const ProductList = () => {
  const { isLoading, data, error } = useQuery("get-product", () =>
    fetchProducts()
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <section className="py-10 bg-w sm:py-16 lg:py-24 z-40 relative">
        <div className="container mx-auto">
          <h2 className="text-3xl font-light text-black sm:text-4xl lg:text-5xl">
            <span className="block w-full font-light text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-500 lg:inline">
              데스크테리어
            </span>{" "}
            를 위한 쇼핑몰
          </h2>
          <p className="mb-20 text-lg text-gray-900">
            나만의 감각으로 내 책상을 ON
          </p>
          <div className="mb-4 text-right">더보기</div>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {data?.map((product) => (
              <div>
                <ProductItem {...product} key={product.id} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// const ProductList = () => {
//   const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () =>
//     fetcher({
//       method: "GET",
//       path: "/products",
//     })
//   );

//   console.log(data);
//   return (
//     <>
//       <div className="grid grid-cols-4 gap-4">
//         {data?.map((product) => (
//           <div>
//             <ProductItem {...product} key={product.id} />
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

export default ProductList;

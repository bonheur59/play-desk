// import { QueryKeys, fetcher } from "@/queryClient";
// import { useQuery } from "react-query";
// import { Product, ProductProps } from "@/type";
// import ProductItem from "@/components/products/Item";
// import { collection, getDocs, orderBy, query } from "firebase/firestore";
// import { db } from "@/firebaseApp";
// import ProductList from "@/components/products/List";

import Button from "@/components/common/Button";

// const fetchProducts = async () => {
//   //firebase의 docs를 판매자의 uid에 따라 가져옴
//   const productsRef = collection(db, "Product");
//   const productQuery = query(productsRef, orderBy("createdAt", "desc"));
//   const querySnapshot = await getDocs(productQuery);

//   const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   return data;
// };

const ProductMainPage = () => {
  // const { isLoading, data, error } = useQuery("get-product", () =>
  //   fetchProducts()
  // );

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <>
      {/* <section className="py-10 bg-w sm:py-16 lg:py-24 z-40 relative">
        <div className="container mx-auto">
          <h2 className="text-3xl font-md text-black sm:text-4xl lg:text-5xl">
            <span className="block w-full font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-500 lg:inline">
              데스크테리어
            </span>{" "}
            를 위한 쇼핑몰
          </h2>
          <p className="mb-20 text-lg text-gray-900">
            나만의 감각으로 내 책상을 ON
          </p>
          <ProductList data={data} category="all" />
          <ProductList data={data} category="furniture" />
          <ProductList data={data} category="electric" />
          <ProductList data={data} category="small-item" />
        </div>
      </section> */}
    </>
  );
};

export default ProductMainPage;

import ProductItem from "@/components/products/Item";
import { db } from "@/firebaseApp";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const fetchProducts = async (param: string) => {
  const productsRef = collection(db, "Product");
  const productQuery = query(
    productsRef,
    where("category", "==", param),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(productQuery);

  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
};

const ShopCategory = () => {
  const params = useParams();
  const [sortOption, setSortOption] = useState("latest"); // 초기 정렬 옵션은 최신순
  const { data, isLoading, error } = useQuery(
    ["get-product", params],
    () => fetchProducts(params.category),
    {
      enabled: !!params,
    }
  );

  const sortData = () => {
    switch (sortOption) {
      case "latest":
        return data;
      case "highToLow":
        return data?.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case "lowToHigh":
        return data?.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      default:
        return data;
    }
  };

  const sortedData = sortData();

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
          {/* 정렬 옵션을 변경하는 셀렉터 */}
          <select onChange={(e) => setSortOption(e.target.value)}>
            <option value="latest">최신순</option>
            <option value="highToLow">가격 높은 순</option>
            <option value="lowToHigh">가격 낮은 순</option>
          </select>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {sortedData?.map((product) => (
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

export default ShopCategory;

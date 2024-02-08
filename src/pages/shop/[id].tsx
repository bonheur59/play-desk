import ProductDetail from "@/components/products/Detail";
import { db } from "@/firebaseApp";
import { QueryKeys, fetcher } from "@/queryClient";
import { Product } from "@/type";
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const fetchProducts = async (id: string) => {
  const productsRef = doc(db, "Product", id);
  const productQuery = query(productsRef);
  const querySnapshot = await getDoc(productQuery);

  return querySnapshot.data();
};

// const fetchRecommendedProducts = async (category: string) => {
//   try {
//     if (category) {
//       const productsCollection = collection(db, "Product");
//       const recommendedProductsQuery = query(
//         productsCollection,
//         where("category", "==", category)
//       );

//       const querySnapshot = await getDocs(recommendedProductsQuery);
//       const recommendedProducts = [];

//       querySnapshot.forEach((doc) => {
//         recommendedProducts.push({ id: doc.id, ...doc.data() });
//       });

//       return recommendedProducts;
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching recommended products:", error.message);
//     // 오류 발생 시 빈 배열 반환
//     return [];
//   }
// };

const ProductDetailPage = () => {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery(
    ["get-product", id],
    () => fetchProducts(id),
    {
      enabled: !!id,
    }
  );

  // const { data: recommendedProducts } = useQuery(
  //   ["get-recommended-products", data?.category, id],
  //   () => fetchRecommendedProducts(data?.category, id),{
  //     enabled: !!data
  //   }
  // );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <ProductDetail item={data} paramId={id} />;
};

export default ProductDetailPage;

// recommendItems={recommendedProducts}

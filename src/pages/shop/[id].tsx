import ProductDetail from "@/components/products/Detail";
import { db } from "@/firebaseApp";
import { QueryKeys, fetcher } from "@/queryClient";
import { Product } from "@/type";
import { doc, getDoc, query } from "firebase/firestore";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const fetchProducts = async (id: string) => {
  const productsRef = doc(db, "Product", id);
  const productQuery = query(productsRef);
  const querySnapshot = await getDoc(productQuery);

  return querySnapshot.data();
};

const ProductDetailPage = () => {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery(["get-product", id], () =>
    fetchProducts(id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log("데이터", data);

  // if (!data) return null;

  return <ProductDetail item={data} />;
};

// const ProductDetailPage = () => {
//   const { id } = useParams();

//   const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
//     fetcher({
//       method: "GET",
//       path: `/products/${id}`,
//     })
//   );

//   if (!data) return null;

//   return <ProductDetail item={data} />;
// };

export default ProductDetailPage;

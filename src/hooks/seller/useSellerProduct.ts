import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import queryClient from "@/queryClient";
import {
  createProduct,
  deleteProduct,
  editProduct,
  fetchProductData,
  fetchProductDataDetail,
  fetchProductDataInfinite,
  fecthRecommendProduct,
} from "@/api/productApi";

//새로운 Product를 생성하는 Mutation
export const useCreateProduct = () => {
  return useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-product");
    },
  });
};

//판매자 판매 상품을 조회하는 UseQuery
export const useReadProduct = (userId: string | undefined) => {
  return useQuery(["get-product", userId], () => fetchProductData(userId), {
    enabled: !!userId,
  });
};

//무한스크롤 적용
//판매자 판매 상품을 조회하는 useInfiniteQuery
export const useReadProductInfinite = (userId: string | undefined) => {
  return useInfiniteQuery(
    ["get-product", userId],
    ({ pageParam }) => fetchProductDataInfinite(userId, pageParam),
    {
      enabled: !!userId,
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    }
  );
};

//상품의 상세 정보를 조회하는 UseQuery
export const useReadProductDetail = (productId: string) => {
  return useQuery(["get-product", productId], () =>
    fetchProductDataDetail(productId)
  );
};

//추천 상품정보를 조회하는 useQuery
export const useRecommendProduct = (productId: string) => {
  return useQuery(["recommend-product", productId], () =>
    fecthRecommendProduct(productId)
  );
};

//판매 상품을 수정하는 Mutation
export const useEditProduct = () => {
  return useMutation(editProduct);
};

//판매 상품을 삭제하는 Mutation
export const useDeleteProduct = () => {
  return useMutation(deleteProduct, {
    // onSuccess: () => {
    //   queryClient.invalidateQueries("get-product");
    // },
  });
};

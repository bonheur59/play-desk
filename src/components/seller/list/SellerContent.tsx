import AuthContext from "@/context/AuthContext";
import { useDeleteProduct } from "@/hooks/seller/useSellerProduct";
import { useCallback, useContext, useEffect, useRef } from "react";
import TableHeader from "./table/TableHeader";
import { useInfiniteQuery } from "react-query";
import { fetchProductDataInfinite } from "@/api/productApi";
import queryClient from "@/queryClient";
import TableItem from "./table/SellerItem";

const SellerContent = () => {
  const { user } = useContext(AuthContext);
  const { mutate: deleteProduct } = useDeleteProduct();
  const observerElem = useRef(null);

  //일반 useQuery 사용 데이터 페칭
  // const { isLoading, data } = useQuery(
  //   ["get-product", user?.uid],
  //   () => fetchProductData(user?.uid),
  //   {
  //     enabled: !!user,
  //   }
  // );

  // if (isLoading) return <div>로딩중입니다.</div>;

  //무한스크롤 적용 1
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["get-product", user?.uid],
      ({ pageParam }) => fetchProductDataInfinite(user?.uid, pageParam),
      {
        enabled: !!user,
        getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
      }
    );

  //무한스크롤 적용 2
  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  //무한스크롤 적용 3
  useEffect(() => {
    const element = observerElem.current;

    // Intersection Observer 설정
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.9,
    };

    // Intersection Observer 인스턴스 생성
    const observer = new IntersectionObserver(handleObserver, options);

    // 관찰 대상 요소 등록
    if (element) observer.observe(element);

    // useEffect 클린업 함수
    return () => {
      // Intersection Observer 해제
      if (element) observer.unobserve(element);
    };
  }, [fetchNextPage, hasNextPage, handleObserver]);

  //제품을 삭제하는 함수
  const handleDelete = (productId: string) => {
    console.log("프로덕트 id", productId);
    deleteProduct(
      { uid: user!.uid, productId },
      {
        //mutate 후 성공 시 처리할 함수 정의
        onSuccess: () => {
          alert("상품이 삭제됐습니다.");
          queryClient.invalidateQueries(["get-product", user?.uid]);
        },
      }
    );
  };

  console.log("데이터", data);

  return (
    <>
      <table className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          {data?.pages.map((page, pageIndex) =>
            page.data.map((item, itemIndex) => (
              <tr key={pageIndex + "-" + itemIndex}>
                <TableItem item={item} handleDelete={handleDelete} />
              </tr>
            ))
          )}
          {/* {data?.map((item) => (
            <tr key={item.id}>
              <SellerItem item={item} />
            </tr>
          ))} */}
        </tbody>
      </table>
      <div className="loader" ref={observerElem}>
        {isFetchingNextPage && hasNextPage ? (
          <h1>{"로딩중입니다."}</h1>
        ) : (
          <div className="text-center">
            <h1>{"더이상 데이터가 없습니다"}</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default SellerContent;

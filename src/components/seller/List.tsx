/* eslint-disable react-hooks/rules-of-hooks */
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db, storage } from "@/firebaseApp";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useDeleteImageMutation,
} from "@/hooks/useProductsMutation";

const fetchProuctData = async (userId: string) => {
  //firebase의 docs를 판매자의 uid에 따라 가져옴
  const productsRef = collection(db, "Product");
  const productQuery = query(
    productsRef,
    where("uid", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(productQuery);

  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
};

const List = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const deleteProductMutation = useDeleteProductMutation(user);
  const deleteImageMutation = useDeleteImageMutation();



  //useQuery 훅을 사용하여 데이터를 가져오기
  const { data, isLoading, error } = useQuery(
    ["get-product", user?.uid],
    () => fetchProuctData(user?.uid),
    {
      enabled: !!user?.uid,
    }
  );

  
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;

  //받아온 카테고리를 한국어로 변환하는 함수
  const getCategoryKoreanName = (englishCategory) => {
    switch (englishCategory) {
      case "furniture":
        return "가구";
      case "electric":
        return "전자제품";
      case "small-item":
        return "소품";
      // 추가적인 카테고리가 있으면 여기에 계속 추가할 수 있습니다.
      default:
        return englishCategory;
    }
  };

  //작성된 게시글을 삭제하는 함수
  const handleDelete = async (id: string) => {
    //이미지 삭제 함수 실행
    await deleteImageMutation.mutateAsync(
      data.find((item) => item.id === id)?.imageUrls
    );

    //게시글 삭제 함수 실행
    await deleteProductMutation.mutateAsync(id);
  };

  return (
    <>
      <tbody className="divide-y divide-gray-200">
        {data?.map((item, index) => (
          <tr
            key={item?.id}
            className="bg-white  transition-all hover:bg-gray-100 hover:shadow-lg"
          >
            <td className="px-6 py-6 whitespace-nowrap">
              {item.imageUrls && item.imageUrls.length > 0 ? (
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-24 h-24">
                    <img
                      className="w-full h-full object-cover rounded"
                      src={item.imageUrls[0]}
                      alt={`Product Image ${index + 1}`}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500"></div>
                  </div>
                </div>
              ) : (
                <div>No Image</div>
              )}
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{item.content}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {getCategoryKoreanName(item.category)}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="inline-flex px-2 text-xs  leading-5  rounded-full">
                {item.price}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {item.quantity}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-900"
              >
                <Link to={`/seller/edit/${item?.id}`}>수정 </Link>
              </button>
              <button
                className="text-red-600 hover:text-indigo-900 ml-4"
                onClick={() => {
                  handleDelete(item.id as string);
                }}
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default List;

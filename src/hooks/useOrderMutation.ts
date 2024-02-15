import AuthContext from "@/context/AuthContext";
import { db } from "@/firebaseApp";
import { addDoc, collection } from "firebase/firestore";
import { useContext } from "react";
import { useMutation } from "react-query";

export const useOrderMutation = () => {
  const { user } = useContext(AuthContext);
  const createOrderMutaion = useMutation(
    async (orderState) => {
      // Firestore에 데이터 저장
      console.log("주문 상태", orderState);

      console.log("유저", user);

      const orderPromises = Array.isArray(orderState)
        ? orderState.map(async (orderState) => {
            const { sellerId, id, orderQuantity } = orderState;

            const newOrder = {
              sellerId,
              buyerId: user.uid,
              productId: id,
              productQuantity: orderQuantity,
              status: "주문 완료",
              createdAt: new Date().toLocaleDateString("ko", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
            };

            const docRef = await addDoc(collection(db, "Order"), newOrder);
            console.log("Firestore에 새로운 Order 문서 생성 완료:", docRef.id);

            return docRef.id;
          })
        : [];

      // Promise.all을 사용하여 모든 주문을 병렬로 처리
      const orderIds = await Promise.all(orderPromises);

      // 모든 주문의 ID를 반환
      return orderIds;
    },
    {
      onSuccess: (data) => {
        // 추가 성공 시 처리
        console.log("Firestore에 Cart 추가 성공:", data);
      },
      onError: (error) => {
        // 에러 발생 시 처리
        console.error("Firestore에 Cart 추가 실패:", error);
      },
    }
  );

  return { createOrderMutaion };
};

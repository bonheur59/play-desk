import { useMutation } from "react-query";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseApp";

//mutation을 사용하여 firebase "Carts" 생성
export const useCartMutation = () => {
  const mutaion = useMutation(
    async ({ userId, items }: { userId: string; items: [] }) => {
      const docRef = await addDoc(collection(db, "Carts"), {
        userId: userId,
        items: items,
      });

      console.log("Firestore에 새로운 Cart 문서 생성 완료:", docRef);

      //추가된 데이터 반환
      return {
        id: docRef.id,
        userId,
        items,
      };
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

  return mutaion;
};

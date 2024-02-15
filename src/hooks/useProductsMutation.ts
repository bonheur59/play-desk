import { useMutation } from "react-query";
import queryClient from "@/queryClient";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebaseApp";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export const useProductMutation = () => {
  const navigate = useNavigate();

  const createProductMutation = useMutation(
    async (formState) => {
      const imageUrls: string[] = [];

      if (formState.imageFiles) {
        for (let i = 0; i < formState.imageFiles.length; i++) {
          const file = formState.imageFiles[i];
          const key = `${formState.user?.uid}/${uuidv4()}`;
          const storageRef = ref(storage, key);

          await uploadBytes(storageRef, file);

          const imageUrl = await getDownloadURL(storageRef);
          imageUrls.push(imageUrl);
        }
      }

      const newProduct = {
        title: formState.title,
        content: formState.content,
        createdAt: new Date().toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        price: formState.price,
        quantity: formState.quantity,
        sellerId: formState.user?.email,
        uid: formState.user?.uid,
        imageUrls: imageUrls,
        category: formState.category,
      };

      // Firestore에 데이터 저장
      const docRef = await addDoc(collection(db, "Product"), newProduct);

      // 새로 생성된 문서의 참조에서 id 가져오기
      const newId = docRef.id;

      // 필드를 추가할 데이터
      const additionalData = {
        id: newId,
      };

      // 생성된 문서의 참조를 이용하여 필드 추가
      await updateDoc(doc(db, "Product", newId), additionalData);

      return docRef;
    },
    {
      onSuccess: () => {
        alert("상품을 생성했습니다.");
        queryClient.invalidateQueries("products"); // 상품 목록 쿼리를 다시 불러오도록 갱신
        navigate("/seller/list");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  return { createProductMutation };
};

//storage의 이미지를 삭제하는 함수
export const useDeleteImageMutation = () => {
  const deleteImageMutation = useMutation(
    async (imageUrls: string[] | undefined) => {
      if (imageUrls) {
        await Promise.all(
          imageUrls.map(async (imageUrl) => {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
          })
        );
      }
    }
  );

  return deleteImageMutation;
};

//store의 doc을 삭제하는 함수
export const useDeleteProductMutation = (user) => {
  const deleteProductMutation = useMutation(
    (id: string) => {
      return deleteDoc(doc(db, "Product", id));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["firestoreData", user?.uid]);
      },
    }
  );

  return deleteProductMutation;
};

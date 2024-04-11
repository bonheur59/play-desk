import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  list,
} from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "@/firebaseApp";
import { ProductType, SellProduct } from "@/types/SellType";

//storage에 이미지를 업로드하는 함수
export const uploadImage = async ({
  userId,
  productId,
  data,
}: {
  userId: string | undefined;
  productId: string;
  data: ProductType;
}) => {
  //data 객체에서 files 속성만 추출
  const { files } = data;

  const uploadedImageUrls = [];

  for (const { imageFile } of files) {
    // Base64 형태의 이미지 데이터를 Blob으로 변환
    const response = await fetch(imageFile);
    const imageBlob = await response.blob();
    // Firebase Storage에 이미지 업로드
    const key = `${userId}/${productId}/${uuidv4()}`;
    const storageRef = ref(storage, key);
    // 이미지 업로드 및 URL 받아오기
    await uploadBytes(storageRef, imageBlob);
    const imageUrl = await getDownloadURL(storageRef);
    // 업로드된 이미지 URL을 배열에 추가
    uploadedImageUrls.push(imageUrl);
  }
  console.log("업로드된 이미지 URL들:", uploadedImageUrls);
};

//firestore에 product 정보를 저장하는 함수
export const createProduct = async ({
  userId,
  data,
}: {
  userId: string | undefined;
  data: ProductType;
}) => {
  const newProduct = {
    title: data.title,
    content: data.content,
    createdAt: new Date().toLocaleDateString("ko", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    sellerUid: userId,
    price: data.price,
    quantity: data.quantity,
    files: data.files,
    category: data.category,
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

  // uploadImage 함수 호출 시 새로 생성된 문서의 참조 ID 전달
  await uploadImage({ userId, productId: newId, data });

  return docRef;
};

//판매자 전체 상품을 fetch하는 함수
//판매자 id에 따른 전체 상품을 불러옴
export const fetchProductData = async (userId: string | undefined) => {
  const productsRef = collection(db, "Product");
  const productQuery = query(
    productsRef,
    where("sellerUid", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(productQuery);
  const data = querySnapshot.docs.map((doc) => {
    const firestoreData = doc.data();
    return {
      id: doc.id,
      category: firestoreData.category,
      content: firestoreData.content,
      createdAt: firestoreData.createdAt,
      files: firestoreData.files,
      price: firestoreData.price,
      quantity: firestoreData.quantity,
      sellerUid: firestoreData.sellerUid,
      title: firestoreData.title,
    };
  });
  return data;
};

//무한스크롤
//리액트 쿼리를 이용하여 전체 상품을 fetch하는 함수
export const fetchProductDataInfinite = async (
  userId: string | undefined,
  pageParam = null
) => {
  const productsRef = collection(db, "Product");

  let productQuery;

  if (pageParam) {
    productQuery = query(
      productsRef,
      where("sellerUid", "==", userId),
      orderBy("createdAt", "desc"),
      startAfter(pageParam), // Use startAfter for pagination
      limit(3) // Adjust the limit as needed
    );
  } else {
    productQuery = query(
      productsRef,
      where("sellerUid", "==", userId),
      orderBy("createdAt", "desc"),
      limit(5) // Adjust the limit as needed
    );
  }

  const querySnapshot = await getDocs(productQuery);
  const data = querySnapshot.docs.map((doc) => {
    const firestoreData = doc.data();
    return {
      id: doc.id,
      category: firestoreData.category,
      content: firestoreData.content,
      createdAt: firestoreData.createdAt,
      files: firestoreData.files,
      price: firestoreData.price,
      quantity: firestoreData.quantity,
      sellerUid: firestoreData.sellerUid,
      title: firestoreData.title,
    };
  });

  return {
    data,
    nextCursor:
      querySnapshot.docs.length > 0
        ? querySnapshot.docs[querySnapshot.docs.length - 1].data().createdAt
        : null,
  };
};

//판매자 상품 하나를 fetch하는 함수
// export const fetchProductDataDetail = async (productId: string | undefined) => {
//   if (!productId) {
//     return null;
//   }
//   // Firebase에서 해당 문서를 가져오는 로직
//   const productRef = doc(collection(db, "Product"), productId);
//   const productDoc = await getDoc(productRef);

//   if (productDoc.exists()) {
//     // 문서가 존재하는 경우 데이터 반환
//     return productDoc.data();
//   } else {
//     // 문서가 존재하지 않는 경우 에러 처리 또는 빈 데이터 반환
//     throw new Error("Product not found");
//   }
// };
export const fetchProductDataDetail = async (
  productId: string | undefined
): Promise<ProductType | undefined> => {
  // Firebase에서 해당 문서를 가져오는 로직
  const productRef = doc(collection(db, "Product"), productId);
  const productDoc = await getDoc(productRef);

  if (productDoc.exists()) {
    // 문서가 존재하는 경우 데이터 반환
    const productData = productDoc.data();
    return {
      id: productDoc.id,
      title: productData.title,
      content: productData.content,
      category: productData.category,
      files: productData.files,
      price: productData.price,
      quantity: productData.quantity,
      sellUid: productData.sellerUid,
      createdAt: productData.createdAt,
    };
  } else {
    // 문서가 존재하지 않는 경우 에러 처리 또는 빈 데이터 반환
    throw new Error("Product not found");
  }
};

export const fecthRecommendProduct = async (productId) => {
  try {
    // 주어진 productId를 사용하여 해당 제품의 카테고리 가져오기
    const productRef = doc(collection(db, "Product"), productId);
    const productDoc = await getDoc(productRef);
    if (!productDoc.exists()) {
      throw new Error("Product not found");
    }
    const productData = productDoc.data();
    const productCategory = productData.category;

    // 카테고리가 같은 상품들을 찾기
    const productsSnapshot = await getDocs(
      query(collection(db, "Product"), where("category", "==", productCategory))
    );

    // 카테고리가 같은 상품 중에서 현재 상품은 제외하고 최대 5개까지 반환
    const recommendProducts = [];
    productsSnapshot.forEach((doc) => {
      const product = doc.data();
      if (doc.id !== productId && recommendProducts.length < 5) {
        recommendProducts.push({
          id: doc.id,
          title: product.title,
          content: product.content,
          category: product.category,
          files: product.files,
          price: product.price,
          quantity: product.quantity,
          sellUid: product.sellerUid,
          createdAt: product.createdAt,
        });
      }
    });

    return recommendProducts;
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    return [];
  }
};

//판매자 상품 문서를 업데이트 하는 함수
export const editProduct = async ({
  userId,
  data,
  productId,
}: {
  userId: string;
  data: ProductType;
  productId: string;
}) => {
  //기존의 이미지를 삭제하는 함수
  deleteProductImg({ userId, productId });

  //FireStore update
  const updateProduct = {
    title: data.title,
    content: data.content,
    createdAt: data.createdAt,
    updatedAt: new Date().toLocaleDateString("ko", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    sellerUid: userId,
    price: data.price,
    quantity: data.quantity,
    files: data.files,
    category: data.category,
  };
  // Firestore 문서 업데이트
  try {
    const docRef = doc(db, "Product", productId);

    // 해당 문서 가져오기
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // 문서가 존재하면 업데이트 수행
      await updateDoc(docRef, updateProduct);
      console.log("문서 업데이트 성공!");

      // 이미지를 업데이트하는 함수
      await uploadImage({ userId, productId: docSnap.id, data });
    } else {
      console.log("해당 ID의 문서가 존재하지 않습니다.");
    }
  } catch (error) {
    console.error("문서 업데이트 중 오류 발생:", error);
    console.log("이미지 업데이트를 수행할 수 없습니다.");
  }
};

//storage에서 이미지를 삭제하는 함수
export const deleteProductImg = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  const folderRef = ref(storage, `${userId}/${productId}/`);

  try {
    // 폴더 내 모든 아이템 리스트 가져오기
    const items = await list(folderRef);

    // 각 아이템을 순회하면서 삭제
    const deletePromises = items.items.map(async (item) => {
      await deleteObject(item);
      console.log(`${item.name} 삭제 완료`);
    });

    // 모든 삭제 작업이 완료될 때까지 대기
    await Promise.all(deletePromises);

    console.log("폴더 내 모든 아이템 삭제 완료");
  } catch (error) {
    console.error("아이템 삭제 중 오류 발생:", error);
  }
};

//상품 정보를 삭제하는 함수
export const deleteProduct = async ({
  uid,
  productId,
}: {
  uid: string;
  productId: string;
}) => {
  try {
    await deleteProductImg({ userId: uid, productId });
    const result = await deleteDoc(doc(db, "Product", productId));
    return result;
  } catch (error) {
    console.error("deleteProduct error:", error);
    throw error;
  }
};

// ------------------------------------------------------------------------
//판매 상품 전체를 정보를 가져오는 함수

export const fetchAllProducts = async () => {
  const productsRef = collection(db, "Product");
  const productQuery = query(productsRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(productQuery);

  const data = querySnapshot.docs.map((doc) => {
    const docData = doc.data();
    return { id: doc.id, ...docData } as SellProduct; // 타입 변환
  });
  return data;
};

//상품 재고를 증감시키는 함수
export const editProductQuantity = async (checkoutItems) => {
  console.log("productApi", checkoutItems);

  checkoutItems.forEach(async (item) => {
    const productId = Object.keys(item)[0]; // 상품의 id를 가져옵니다.
    const quantity = item[productId]; // 상품의 수량을 가져옵니다.

    console.log("프덕 id", productId);
    console.log("quantity", quantity);

    const productRef = doc(db, "Product", productId);
    // Firestore에서 해당 상품의 문서를 가져옵니다.
    try {
      // Firestore에서 해당 상품의 문서를 가져옵니다.
      const productDoc = await getDoc(productRef);
      if (productDoc.exists()) {
        // 해당 상품이 존재하는 경우
        const currentQuantity = productDoc.data().quantity;
        const updatedQuantity = currentQuantity - quantity;

        // 상품의 수량을 수정합니다.
        if (updatedQuantity < 0) {
          // 수정된 재고가 0 미만이면 알람을 띄우고 수정하지 않습니다.
          console.log(`상품 ${productId}의 재고가 이미 소진되었습니다.`);
          // 여기에 알람을 띄우는 코드를 추가할 수 있습니다.
        } else {
          // 수정된 재고가 0 이상이면 상품의 수량을 수정합니다.
          await updateDoc(productRef, { quantity: updatedQuantity });
          console.log(`상품 ${productId}의 재고가 성공적으로 수정되었습니다.`);
        }
      } else {
        console.log(`해당 상품 ${productId}을(를) 찾을 수 없습니다.`);
      }
    } catch (error) {
      console.error(
        `상품 ${productId}의 재고를 수정하는 동안 오류가 발생했습니다:`,
        error
      );
    }
  });
};

//Order db를 만드는 함수
export const createOrder = async ({ orderItem, userData, buyerUid }) => {
  //주문자의 기본 정보를 받아야 함
  console.log("API orderItem", orderItem);
  console.log("API userData", userData);
  //프로덕트의 개수만큼 Doc을 생성해야함
  //
  const newOrder = {
    buyerUid: buyerUid,
    userName: userData.userName,
    userPhone: userData.phone,
    productId: orderItem.id,
    createdAt: new Date().toLocaleDateString("ko", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    price: orderItem.price,
    sellerUid: orderItem.sellUid,
    orderStatus: "주문완료",
  };

  // // Firestore에 데이터 저장
  const docRef = await addDoc(collection(db, "Order"), newOrder);

  return docRef;
};

//구매자의 구매 상품을 fetch하는 함수
//판매자 id에 따른 전체 상품을 불러옴
export const fetchOrdertData = async (userId: string | undefined) => {
  const productsRef = collection(db, "Order");
  const productQuery = query(
    productsRef,
    where("buyerUid", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(productQuery);
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
};

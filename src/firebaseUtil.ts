import { getFirestore, doc, getDoc } from "firebase/firestore";

// 사용자의 UID를 기반으로 Firestore에서 데이터를 읽어오는 함수
export const getUserDataFromFirestore = async (uid: string) => {
  const db = getFirestore();
  const userDocRef = doc(db, "User", uid); // "User"는 Firestore 컬렉션명, uid는 사용자의 UID

  try {
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      // 도큐먼트가 존재하면 해당 데이터를 반환
      return userDocSnapshot.data();
    } else {
      // 도큐먼트가 존재하지 않으면 null 또는 기본값을 반환
      return null;
    }
  } catch (error) {
    console.error(
      "Firestore에서 사용자 데이터를 읽어오는 중 오류 발생:",
      error
    );
    throw error;
  }
};

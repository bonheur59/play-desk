import { app, db } from "@/firebaseApp";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

enum UserTypeEnum {
  buyer = "buyer",
  seller = "seller",
}

interface FormDataProps {
  email: string;
  password: string;
  nickName: string;
  userType: UserTypeEnum;
  shopName: string;
}

export const createUserInFirestore = async ({
  email,
  password,
  nickName,
  userType,
  shopName,
}: FormDataProps) => {
  const auth = getAuth(app);
  console.log("firebase", email, password, nickName, userType, shopName);

  //firebase auth 계정 생성
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(user, {
    displayName: nickName,
  });

  const newUser = {
    uid: user.uid,
    email: user.email,
    nickName: nickName,
    isSeller: userType === "seller" ? true : false,
    shopName: shopName,
  };
  //fireStore에 유저 정보 저장
  await setDoc(doc(collection(db, "User"), user.uid), newUser);

  // 사용자 정보 반환
  return user;
};

export default createUserInFirestore;

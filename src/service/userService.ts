import { createUserInFirestore } from "@/firebase/auth";
import { app, db } from "@/firebaseApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

enum UserTypeEnum {
  buyer = "buyer",
  seller = "seller",
}

interface CreateFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  nickName: string;
  userType: UserTypeEnum;
  shopName: string;
}

interface LoginFormData {
  email: string;
  password: string;
  shopName?: string;
}

export const createUser = async (data: CreateFormData) => {
  console.log("데이터", data);
  try {
    const { email, password, nickName, userType, shopName } = data;
    // Firebase Authentication에 사용자 생성
    const user = await createUserInFirestore({
      email,
      password,
      nickName,
      userType,
      shopName,
    });

    return user; // 사용자 정보 반환
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

export const loginUser = async (data: LoginFormData) => {
  console.log("데이터", data);
  try {
    const { email, password } = data;
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return user;
  } catch (error) {
    throw new Error("Failed to login user");
  }
};

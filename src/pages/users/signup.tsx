import Form from "@/components/users/SignupForm";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { app, db } from "@/firebaseApp";
import { collection, doc, setDoc } from "firebase/firestore";

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
  nickName: string;
  userType: "buyer" | "seller" | null;
}

const SignupPage = () => {
  const onSubmit = async (formData: FormData) => {
    console.log("전달받은 form data", formData);
    try {
      const { email, password, nickName, passwordConfirm, userType } = formData;
      const auth = getAuth(app);

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, {
        displayName: nickName,
      });

      const newUser = {
        uid: user.uid,
        email: user.email,
        nickName: nickName,
        isSeller: userType === "seller" ? true : false,
      };

      await setDoc(doc(collection(db, "User"), user.uid), newUser);
    } catch (error) {
      if (error instanceof FirebaseError) {
        // FirebaseError에 대한 처리
        console.error("Firebase 에러 코드:", error.code);
        console.error("Firebase 에러 메시지:", error.message);
      } else {
        // 다른 타입의 에러에 대한 처리
        console.error("일반 에러:", error);
      }
    }
  };

  return (
    <div>
      <Form onSubmit={onSubmit} />
    </div>
  );
};

export default SignupPage;

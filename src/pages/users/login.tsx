import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { app, db } from "@/firebaseApp";

import LoginForm from "@/components/users/LoginForm";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (formData: FormData) => {
    console.log("전달받은 form data", formData);
    const { email, password } = formData;

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      alert("로그인에 성공했습니다.");
      navigate("/seller/list");
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

  return <LoginForm onSubmit={onSubmit} />;
};

export default LoginPage;

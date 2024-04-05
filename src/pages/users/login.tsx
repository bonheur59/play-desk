import LoginForm from "@/components/users/LoginForm";
import UserLayout from "@/layout/UserLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = {
  email: string;
  password: string;
  shopName?: string;
};

const schema = (userType: string) => {
  if (userType === "seller") {
    return z.object({
      email: z.string().min(1, { message: "이메일을 입력해주세요" }),
      password: z
        .string()
        .trim()
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
          {
            message: `비밀번호는 8자 이상의 영문 대소문자와 숫자, 특수문자를 포함하여야 합니다.`,
          }
        ),
      shopName: z.string().min(1, { message: "상점이름을 입력해주세요" }),
    });
  } else {
    return z.object({
      email: z.string().min(1, { message: "이메일을 입력해주세요" }),
      password: z
        .string()
        .trim()
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
          {
            message: `비밀번호는 8자 이상의 영문 대소문자와 숫자, 특수문자를 포함하여야 합니다.`,
          }
        ),
    });
  }
};

const LoginPage = () => {
  const [userType, setUserType] = useState<"buyer" | "seller">("buyer");

  const handleUserType = (userType: "buyer" | "seller") => {
    setUserType(userType);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema(userType)),
    defaultValues: {
      email: "",
      password: "",
      shopName: userType === "seller" ? "" : undefined, // 판매자일 경우에만 shopName을 초기화
    },
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <UserLayout>
      <div className="flex gap-10">
        <button
          className={`p-2 m-2 w-[70px] h-10 ${
            userType === "buyer" ? "text-main-color" : ""
          }`}
          onClick={() => handleUserType("buyer")}
        >
          buyer
        </button>
        <button
          className={`p-2 m-2 w-[70px] h-10 ${
            userType === "seller" ? "text-main-color" : ""
          }`}
          onClick={() => handleUserType("seller")}
        >
          seller
        </button>
      </div>
      <LoginForm
        type={userType}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        register={register}
      />
    </UserLayout>
  );
};

export default LoginPage;

// import { useNavigate } from "react-router-dom";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { FirebaseError } from "firebase/app";
// import { app, db } from "@/firebaseApp";

// import LoginForm from "@/components/users/LoginForm";

// interface FormData {
//   email: string;
//   password: string;
// }

// const LoginPage = () => {
//   const navigate = useNavigate();

//   const onSubmit = async (formData: FormData) => {
//     console.log("전달받은 form data", formData);
//     const { email, password } = formData;

//     try {
//       const auth = getAuth(app);
//       await signInWithEmailAndPassword(auth, email, password);
//       alert("로그인에 성공했습니다.");
//       navigate("/seller/list");
//     } catch (error) {
//       if (error instanceof FirebaseError) {
//         // FirebaseError에 대한 처리
//         console.error("Firebase 에러 코드:", error.code);
//         console.error("Firebase 에러 메시지:", error.message);
//       } else {
//         // 다른 타입의 에러에 대한 처리
//         console.error("일반 에러:", error);
//       }
//     }
//   };

//   // return <LoginForm onSubmit={onSubmit} />;
//   return (
//     <>
//       <div> 로그인페이지 입니다. </div>
//     </>
//   );
// };

// export default LoginPage;

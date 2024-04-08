import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserLayout from "@/layout/UserLayout";
import Button from "@/components/common/Button";
import { createUser } from "@/service/userService";
import { useEffect } from "react";
import SignupForm from "@/components/users/SignupForm";

enum UserTypeEnum {
  buyer = "buyer",
  seller = "seller",
}

type FormData = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickName: string;
  userType: UserTypeEnum;
  shopName: string;
};

const schema = z
  .object({
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
    passwordConfirm: z.string().min(1, { message: "비밀번호를 확인해주세요" }),
    nickName: z.string().min(2, { message: "닉네임을 2자 이상 입력해주세요" }),
    userType: z.string(),
    shopName: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      nickName: "",
      userType: UserTypeEnum.buyer,
      shopName: "",
    },
  });

  const navigate = useNavigate();

  // userType 필드를 watch 함수의 인자로 전달하여 userType 값의 변경을 감지함
  const userType = watch("userType");

  //userType이 바뀔때마다 shopaName의 value를 초기화 해줌
  useEffect(() => {
    setValue("shopName", "");
  }, [userType]);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const user = await createUser(data);
      if (user) {
        alert("회원가입에 성공했습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <UserLayout>
      <div className="text-center">회원가입</div>
      <SignupForm
        userType={userType}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
      />
    </UserLayout>
  );
};

export default SignupPage;

// import { useNavigate } from "react-router-dom";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import { FirebaseError } from "firebase/app";
// import { app, db } from "@/firebaseApp";
// import { collection, doc, setDoc } from "firebase/firestore";
// import Form from "@/components/users/SignupForm";

// interface FormData {
//   email: string;
//   password: string;
//   passwordConfirm: string;
//   nickName: string;
//   userType: "buyer" | "seller" | null;
// }

// const SignupPage = () => {
//   const navigate = useNavigate();

//   const onSubmit = async (formData: FormData) => {
//     console.log("전달받은 form data", formData);
//     try {
//       const { email, password, nickName, passwordConfirm, userType } = formData;
//       const auth = getAuth(app);

//       const { user } = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       await updateProfile(user, {
//         displayName: nickName,
//       });

//       const newUser = {
//         uid: user.uid,
//         email: user.email,
//         nickName: nickName,
//         isSeller: userType === "seller" ? true : false,
//       };

//       await setDoc(doc(collection(db, "User"), user.uid), newUser);

//       //회원상태에 따라 라우팅처리 필요
//       navigate("/users/login");
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

//   return (
//     <div>
//       {/* <Form onSubmit={onSubmit} /> */}
//       회원가입페이지 입니다.
//     </div>
//   );
// };

// export default SignupPage;

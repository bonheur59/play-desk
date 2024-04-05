import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      nickName: "",
      userType: UserTypeEnum.buyer,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <UserLayout>
      <div className="text-center">회원가입</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-4"
      >
        <div>
          <label className="text-sm font-medium">이메일</label>
          <Input
            type="text"
            className="bg-gray-50 text-gray-500 outline-none"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500  text-sm">{errors.email?.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">비밀번호</label>
          <Input
            type="password"
            className="bg-gray-50 text-gray-500 outline-none"
            {...register("password")}
          />
          {errors.password && (
            <p className=" text-red-500 text-sm">{errors.password?.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">비밀번호 확인</label>
          <Input
            type="password"
            className="bg-gray-50 text-gray-500 outline-none"
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && (
            <p className=" text-red-500  text-sm">
              {errors.passwordConfirm?.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">닉네임</label>
          <Input
            className="bg-gray-50 text-gray-500 outline-none"
            {...register("nickName")}
          />
          {errors.nickName && (
            <p className=" text-red-500  text-sm">{errors.nickName?.message}</p>
          )}
        </div>
        <div>
          {" "}
          <label className="text-sm font-medium">회원 유형</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="구매자" />
            </SelectTrigger>
            <SelectContent {...register("userType")}>
              {" "}
              <SelectItem value="buyer">구매자</SelectItem>
              <SelectItem value="seller">판매자</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" size="w-full" color="main" font="medium">
          버튼
        </Button>
      </form>
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

import React from "react";
import Button from "../common/Button";
import { Input } from "../ui/input";
import { FieldErrors, SubmitHandler, UseFormReturn } from "react-hook-form";

enum UserTypeEnum {
  buyer = "buyer",
  seller = "seller",
}

interface SignupFormProps {
  userType: UserTypeEnum;
  onSubmit: SubmitHandler<FormData>;
  handleSubmit: UseFormReturn<FormData>["handleSubmit"];
  register: UseFormReturn<FormData>["register"];
  errors: FieldErrors<FormData>;
}

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
  nickName: string;
  userType: UserTypeEnum;
  shopName: string;
}

const SignupForm: React.FC<SignupFormProps> = ({
  userType,
  onSubmit,
  handleSubmit,
  register,
  errors,
}) => {
  return (
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
        <select {...register("userType")}>
          {" "}
          <option value="buyer">구매자</option>
          <option value="seller">판매자</option>
        </select>
      </div>
      {userType === UserTypeEnum.seller && (
        <div>
          <label className="text-sm font-medium">상점 이름</label>
          <Input
            type="text"
            className="bg-gray-50 text-gray-500 outline-none"
            {...register("shopName")}
          />
          {errors.shopName && (
            <p className=" text-red-500 text-sm">{errors.shopName?.message}</p>
          )}
        </div>
      )}
      <Button type="submit" size="w-full" color="main" font="medium">
        버튼
      </Button>
    </form>
  );
};

export default SignupForm;

// import * as z from "zod";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {} from "@radix-ui/react-select";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   SelectContent,
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectItem,
// } from "@/components/ui/select";

// interface FormData {
//   email: string;
//   password: string;
//   passwordConfirm: string;
//   nickName: string;
//   userType: "buyer" | "seller" | null;
// }

// interface SignupFormProps {
//   onSubmit: SubmitHandler<FormData>;
// }

// const formSchema = z
//   .object({
//     email: z.string().email({ message: "올바른 이메일 주소를 입력하세요." }),
//     password: z.string().min(8, { message: "비밀번호를 8자 이상 입려하세요" }),
//     passwordConfirm: z.string(),
//     nickName: z
//       .string()
//       .min(1, { message: "닉네임을 한글자이상 입력해주세요" }),
//     userType: z.enum(["buyer", "seller"]).nullable(),
//   })
//   .refine(
//     (data) => {
//       return data.password === data.passwordConfirm;
//     },
//     {
//       message: "비밀번호가 일치하지 않습니다.",
//       path: ["passwordConfirm"],
//     }
//   )
//   .refine((data) => data.userType !== null && data.userType !== undefined, {
//     message: "회원 유형을 선택하세요.",
//     path: ["userType"],
//   });

// const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
//   const form = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       passwordConfirm: "",
//       nickName: "",
//       userType: undefined,
//     },
//   });

//   const handleSubmit = (values: z.infer<typeof formSchema>) => {
//     onSubmit(values);
//   };

//   return (
//     <>
//       <main className="flex items-center justify-center h-screen bg-gray-100 ">
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(handleSubmit)}
//             className="flex flex-col w-96 p-6 shadow-sm items-center justify-center gap-4 bg-white rounded-md"
//           >
//             <div>
//               이미지 자리 입니다.
//               <img />
//             </div>
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => {
//                 return (
//                   <FormItem className="w-full">
//                     <FormLabel>이메일</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="email"
//                         className=" bg-gray-50 text-gray-500 outline-none"
//                         // placeholder="이메일을 입력하세요"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 );
//               }}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => {
//                 return (
//                   <FormItem className="w-full">
//                     <FormLabel>비밀번호</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         className=" bg-gray-50 text-gray-500 outline-none"
//                         // placeholder="비밀번호를 입력하세요"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 );
//               }}
//             />
//             <FormField
//               control={form.control}
//               name="passwordConfirm"
//               render={({ field }) => {
//                 return (
//                   <FormItem className="w-full">
//                     <FormLabel>비밀번호 확인</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         className=" bg-gray-50 text-gray-500 outline-none"
//                         // placeholder="비밀번호를 한번 더 입력하세요"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 );
//               }}
//             />
//             <FormField
//               control={form.control}
//               name="nickName"
//               render={({ field }) => {
//                 return (
//                   <FormItem className="w-full">
//                     <FormLabel>닉네임</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="nickName"
//                         className=" bg-gray-50 text-gray-500 outline-none"
//                         // placeholder="닉네임을 입력하세요"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage></FormMessage>
//                   </FormItem>
//                 );
//               }}
//             />
//             <FormField
//               control={form.control}
//               name="userType"
//               render={({ field }) => {
//                 return (
//                   <FormItem className="w-full">
//                     <FormLabel>회원유형</FormLabel>
//                     <Select onValueChange={field.onChange}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="회원유형을 선택해주세요" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="buyer">구매자</SelectItem>
//                         <SelectItem value="seller">판매자</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage></FormMessage>
//                   </FormItem>
//                 );
//               }}
//             />
//             <Button type="submit" className="w-full mt-5 bg-main-color">
//               회원가입
//             </Button>
//           </form>
//         </Form>
//       </main>
//     </>
//   );
// };

// export default SignupForm;

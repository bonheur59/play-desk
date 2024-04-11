import React from "react";
import Button from "../common/Button";
import { Input } from "../ui/input";
import { FieldErrors, SubmitHandler, UseFormReturn } from "react-hook-form";

interface LoginFormProps {
  type: "buyer" | "seller";
  onSubmit: SubmitHandler<FormData>;
  handleSubmit: UseFormReturn<FormData>["handleSubmit"];
  register: UseFormReturn<FormData>["register"];
  errors: FieldErrors<FormData>;
}

interface FormData {
  email: string;
  password: string;
  shopName?: string; // seller 유형에만 존재
}

const LoginForm: React.FC<LoginFormProps> = ({
  type,
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
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium">비밀번호</label>
        <Input
          type="password"
          autoComplete="off"
          className="bg-gray-50 text-gray-500 outline-none"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        )}
      </div>
      {type === "seller" && (
        <div>
          <label className="text-sm font-medium">상점 이름</label>
          <Input
            type="text"
            className="bg-gray-50 text-gray-500 outline-none"
            {...register("shopName")}
          />
          {errors.shopName && (
            <p className="text-red-500 text-sm">{errors.shopName?.message}</p>
          )}
        </div>
      )}
      <Button type="submit" size="w-full" color="main" font="medium">
        버튼
      </Button>
    </form>
  );
};

export default LoginForm;

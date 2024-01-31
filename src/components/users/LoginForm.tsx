import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: SubmitHandler<FormData>;
}

const formSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 주소를 입력하세요." }),
  password: z.string().min(8, { message: "비밀번호를 8자 이상 입려하세요" }),
});

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <>
      <main className="flex items-center justify-center h-screen bg-gray-100 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col w-96 p-6 shadow-sm items-center justify-center gap-4 bg-white rounded-md"
          >
            <div>
              이미지 자리 입니다.
              <img />
            </div>
            {/* <div className="space-beetween">
              <button>구매자</button>
              <button>판매자</button>
            </div> */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem className="w-full ">
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="bg-gray-50 text-gray-500 outline-none"
                        // placeholder="이메일을 입력하세요"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem className="w-full ">
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="bg-gray-50 text-gray-500 outline-none"
                        placeholder="비밀번호를 입력하세요"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit" className="w-full mt-5 bg-main-color">
              로그인
            </Button>
            <div className="text-sm">
              <span className="mr-3 text-gray-400">회원이 아니신가요?</span>
              <Link to="/users/signup" className="underline">
                회원가입
              </Link>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
};

export default LoginForm;

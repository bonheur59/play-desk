import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {} from "@radix-ui/react-select";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SelectContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
  nickName: string;
  userType: "buyer" | "seller" | null;
}

interface SignupFormProps {
  onSubmit: SubmitHandler<FormData>;
}

const formSchema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 주소를 입력하세요." }),
    password: z.string().min(8, { message: "비밀번호를 8자 이상 입려하세요" }),
    passwordConfirm: z.string(),
    nickName: z
      .string()
      .min(1, { message: "닉네임을 한글자이상 입력해주세요" }),
    userType: z.enum(["buyer", "seller"]).nullable(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["passwordConfirm"],
    }
  )
  .refine((data) => data.userType !== null && data.userType !== undefined, {
    message: "회원 유형을 선택하세요.",
    path: ["userType"],
  });

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      nickName: "",
      userType: undefined,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <>
      <main className="flex flex-col items-center p-24">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="이메일을 입력하세요"
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
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
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
              name="passwordConfirm"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호를 한번 더 입력하세요"
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
              name="nickName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input
                        type="nickName"
                        placeholder="닉네임을 입력하세요"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>회원유형</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="회원유형을 선택해주세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="buyer">구매자</SelectItem>
                        <SelectItem value="seller">판매자</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage></FormMessage>
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="w-[100px]">
              회원가입
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
};

export default SignupForm;

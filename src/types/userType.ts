export type User = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickName: string;
  userType: "buyer" | "seller";
  shopName: string;
};

// User 타입에서 필요한 부분만 추출
export type UserSubset = {
  email: string;
  password: string;
  shopName: string;
  onSubmit: (values: UserSubset) => void;
};
export type LoginProps = {
  onSubmit: (formData: UserSubset) => Promise<void>;
};

export type SignupProps = {
  onSubmit: (formData: User) => Promise<void>;
};

export type UserTypeButtonProps = {
  userType: string;
  selectedUserType: string;
  onClick: (userType: string) => void;
};

export type UserContextData = {
  email: string;
  nickName: string;
  isSeller: boolean;
  shopName: string;
  uid: string;
};

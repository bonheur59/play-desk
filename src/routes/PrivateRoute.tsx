import { Navigate, Outlet } from "react-router-dom";

interface userType {
  email: string;
  isSeller: boolean;
  nickName: string;
  uid: string;
}

interface RouterProps {
  user: userType;
  isSeller?: boolean;
}

const PrivateRoute = ({ user }: RouterProps) => {
  console.log("전달받은 user", user);

  if (!user) {
    alert("로그인이 필요합니다.");
  }

  return user ? <Outlet /> : <Navigate replace to="/" />;
};

export default PrivateRoute;

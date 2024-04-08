import { Navigate, Outlet } from "react-router-dom";

interface userType {
  email: string;
  isSeller: boolean;
  nickName: string;
  uid: string;
}

interface RouterProps {
  condition: boolean | null;
  isSeller?: boolean;
}

const PrivateRoute = ({ condition }: RouterProps) => {
  console.log("전달받은 user", condition);

  return condition ? <Outlet /> : <Navigate replace to="/users/login" />;
};

export default PrivateRoute;

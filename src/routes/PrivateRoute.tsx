import { Navigate, Outlet } from "react-router-dom";

interface RouterProps {
  condition: boolean;
  isSeller?: boolean;
}

const PrivateRoute = ({ condition }: RouterProps) => {
  return condition ? <Outlet /> : <Navigate replace to="/users/login" />;
};

export default PrivateRoute;

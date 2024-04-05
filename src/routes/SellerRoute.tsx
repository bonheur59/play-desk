import { Navigate, Outlet } from "react-router-dom";

interface SellerRouteProps {
  seller: boolean;
}

const SellerRoute = ({ seller }: SellerRouteProps) => {
  return seller ? <Outlet /> : <Navigate to={"/"} />;
};

export default SellerRoute;

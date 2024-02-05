import HomePage from "@/pages/home";
import SellList from "@/pages/seller/list";
import LoginPage from "@/pages/users/login";
import SignupPage from "@/pages/users/signup";
import ProductNew from "@/pages/seller/new";
import MyPage from "@/pages/users/profile";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import ProductEdit from "@/pages/seller/edit";
import ProductDetail from "@/pages/shop/[id]";
import ProductList from "@/pages/shop";
import MainLayout from "@/layout/MainLayout";

interface RouterProps {
  isAuthenticated: boolean;
}

const Router = ({ isAuthenticated }: RouterProps) => {
  const { user } = useContext(AuthContext);
  console.log("라우터 user", user);
  console.log("라우터 isAuth", isAuthenticated);
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route element={<MainLayout />}>
            {/* 판매자 */}
            {user?.isSeller ? (
              <>
                {" "}
                <Route path="/seller/list" element={<SellList />} />
                <Route path="/seller/new" element={<ProductNew />} />
              </>
            ) : (
              <> </>
            )}
            {/* 로그인된 모든 회원 */}

            <Route path="/" element={<HomePage />} />
            <Route path="/users/profile" element={<MyPage />} />
            <Route path="/seller/edit/:id" element={<ProductEdit />} />
          </Route>
        </>
      ) : (
        <>
          <Route element={<MainLayout />}>
            <Route path="/shop" element={<ProductList />} />
            <Route path="/shop/:id" element={<ProductDetail />} />
          </Route>
          <Route path="/users/login" element={<LoginPage />} />
          <Route path="/users/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default Router;

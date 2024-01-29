import HomePage from "@/pages/home";
import SellList from "@/pages/seller/list";
import LoginPage from "@/pages/users/login";
import SignupPage from "@/pages/users/signup";
import ProductCreate from "@/pages/seller/create";
import MyPage from "@/pages/users/profile";
import { Routes, Route, Navigate } from "react-router-dom";

interface RouterProps {
  isAuthenticated: boolean;
  isSeller: boolean | null;
}

const Router = ({ isAuthenticated, isSeller }: RouterProps) => {
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          {/* isSeller 값에 따라 판매자 페이지 또는 홈 페이지로 이동 */}
          {isSeller !== null ? (
            isSeller ? (
              <>
                <Route path="/seller/list" element={<SellList />} />
                <Route path="/seller/create" element={<ProductCreate />} />
                <Route path="/users/profile" element={<MyPage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/users/profile" element={<MyPage />} />
              </>
            )
          ) : (
            <>
              <Route path="/users/profile" element={<MyPage />} />
            </>
          )}
        </>
      ) : (
        <>
          <Route path="/users/login" element={<LoginPage />} />
          <Route path="/users/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default Router;

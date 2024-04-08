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
import ProductMainPage from "@/pages/shop";
import OrderListPage from "@/pages/seller/orderList";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

interface userType {
  email: string;
  isSeller: boolean;
  nickName: string;
  uid: string;
}

interface RouterProps {
  user: userType | null;
}

const Router = () => {
  // console.log("라우터 유저", user);
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* 로그인 & 비로그인 공통 */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<ProductMainPage />} />
        <Route path="/shop/product/:id" element={<ProductDetail />} />
      </Route>
      {/* 로그인 되어있지 않아야 할 경우 */}
      <Route element={<PrivateRoute condition={!user} />}>
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/users/signup" element={<SignupPage />} />
      </Route>

      {/* 로그인이 필요한 경우 */}

      <Route element={<PrivateRoute condition={user ? true : false} />}>
        <Route path="/users/mypage" element={<MyPage />} />
        <Route path="/cart" />
        <Route path="/order" element={<OrderListPage />} />
        <Route path="/users/myorder" />
        {/* 판매자 접근 */}
        {user && (
          <Route element={<SellerRoute seller={user.isSeller} />}>
            <Route path="/seller/list" element={<SellList />} />
            <Route path="/seller/new" />
            <Route path="/seller/edit/:id" />
          </Route>
        )}
      </Route>
    </Routes>
  );
};

// <Routes>
//   <Route path="/users/login" element={<LoginPage />} />
//   {isAuthenticated ? (
//     <>
//       <Route element={<MainLayout />}>
//         {/* 판매자 */}
//         {user?.isSeller ? (
//           <>
//             {" "}
//             <Route path="/seller/list" element={<SellList />} />
//             <Route path="/seller/new" element={<ProductNew />} />
//           </>
//         ) : (
//           <> </>
//         )}
//         {/* 로그인된 모든 회원 */}

//         <Route path="/" element={<HomePage />} />
//         <Route path="/users/profile" element={<MyPage />} />
//         <Route path="/seller/edit/:id" element={<ProductEdit />} />
//       </Route>
//     </>
//   ) : (
//     <>
//       <Route element={<MainLayout />}>
//         <Route path="/shop" element={<ProductList />} />
//         <Route path="/shop/:id" element={<ProductDetail />} />
//       </Route>

//       <Route path="/users/signup" element={<SignupPage />} />
//       <Route path="*" element={<Navigate replace to="/" />} />
//     </>
//   )}
// </Routes>
// );
// };

export default Router;

import Profile from "@/components/users/Profile";
import MypageLayout from "@/layout/MypageLayout";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("order-list");
  const { params } = useParams();

  const handleCategory = (category) => {
    setMenu(category);

    if (category === "order-list") {
      navigate(`/shop/${category}`);
    }
    if (category === "profile") {
      navigate(`/users/${category}`);
    }
  };

  // 메뉴 항목에 따라 다른 컴포넌트를 정의합니다.
  const components = {
    profile: <Profile />,
  };

  return (
    <>
      <div className="test">
        <p>현재 페이지의 파라미터는 {params} 입니다.</p>
      </div>

      {/* <div className="">
        <div className="">{components[menu]}</div>
      </div> */}
    </>
  );
};

export default MyPage;

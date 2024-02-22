import Profile from "@/components/users/Profile";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("order-list");

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
      <div className="">
        <div className="">{components[menu]}</div>
      </div>
    </>
  );
};

export default MyPage;

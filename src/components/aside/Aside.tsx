import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../users/Profile";

const Aside = () => {
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

  return (
    <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block ">
      <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
        <h2 className="pl-3 mb-4 text-2xl font-semibold">
          <Link to="">My Page</Link>
        </h2>
        <ul>
          <li
            className={`${
              menu === "order-list"
                ? "flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
                : ""
            }`}
          >
            <Link
              to="/shop/order-list"
              onClick={() => handleCategory("order-list")}
            >
              주문내역
            </Link>
          </li>
          <li
            className={`${
              menu === "profile"
                ? "flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
                : ""
            }`}
          >
            <Link to="/users/profile" onClick={() => handleCategory("profile")}>
              계정 정보
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;

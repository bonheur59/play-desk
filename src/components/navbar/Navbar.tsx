import logo from "@/assets/logo.png";
import AuthContext from "@/context/AuthContext";
import { app } from "@/firebaseApp";
import { getAuth, signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menu, setMenu] = useState("furniture");

  const onSignOut = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      navigate("/shop");
    } catch (error) {
      console.log(error);
    }
  };

  const onSignIn = async () => {
    navigate("/users/login");
  };

  const handleCategory = (category) => {
    setMenu(category);
    navigate(`/shop/category/${category}`);
  };

  const handleCart = () => {
    navigate("/shop/cart");
  };

  return (
    <div className="flex justify-around  shadow-slate-100 p-6 px-10">
      <div className="flex items-center gap-2.5">
        <Link to={"/shop"}>
          <img src={logo} className="w-[260px]" />
        </Link>
      </div>
      <ul className="flex items-center list-none gap-[50px] text-[#626262] text-xl font-medium">
        <li
          onClick={() => handleCategory("furniture")}
          className="flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          가구
          {menu === "furniture" ? (
            <hr className="w-5/6 h-1 rounded-sm bg-sky-500" />
          ) : (
            <></>
          )}
        </li>
        <li
          onClick={() => handleCategory("electric")}
          className="flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          전자기기
          {menu === "electric" ? (
            <hr className="w-5/6 h-1 rounded-sm bg-sky-500" />
          ) : (
            <></>
          )}
        </li>
        <li
          onClick={() => handleCategory("small-item")}
          className="flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          소품
          {menu === "small-item" ? (
            <hr className="w-5/6 h-1 rounded-sm bg-sky-500" />
          ) : (
            <></>
          )}
        </li>
        <li className="flex flex-col items-center justify-center gap-1 cursor-pointer"></li>
      </ul>
      <div className="flex items-center gap-[24px]  ">
        {user ? (
          <button
            className="text-[#626262] text-lg font-medium"
            onClick={onSignOut}
          >
            Logout
          </button>
        ) : (
          <button
            className="text-[#626262] text-lg font-medium"
            onClick={onSignIn}
          >
            Login
          </button>
        )}

        <button onClick={handleCart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-8 h-8 stroke-[#626262]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

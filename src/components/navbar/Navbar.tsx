// import AuthContext from "@/context/AuthContext";
// import CartContext from "@/context/CartContext";
import AuthContext from "@/context/AuthContext";
import { app } from "@/firebaseApp";
import { getAuth, signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.svg?react";
import DropDown from "./DropDown";

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("");
  // const { cartItems } = useCart();

  const handleCategory = (category: string) => {
    setMenu(category);
    navigate(`/shop/category/${category}`);
  };

  const handleCart = () => {
    navigate("/shop/cart");
  };

  // useEffect(() => {
  //   // user가 로드되었을 때 로딩 상태 변경
  //   if (user !== null) {
  //     setLoading(false);
  //   }
  // }, [user]);

  // const onSignOut = async () => {
  //   try {
  //     await logout();
  //     // const auth = getAuth(app);
  //     // await signOut(auth);
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const onSignIn = async () => {
  //   navigate("/users/login");
  // };

  // const handleCategory = (category) => {
  //   setMenu(category);
  //   navigate(`/shop/category/${category}`);
  // };

  // const handleCart = () => {
  //   navigate("/shop/cart");
  // };

  return (
    <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
        >
          {/* <img
          src=""
          className="h-8"
          alt="Flowbite Logo"
        /> */}
          <span
            className="self-center text-3xl font-bold whitespace-nowrap dark:text-white"
            onClick={() => {
              setMenu("");
            }}
          >
            <Logo />
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="px-4 py-2 text-center">
            <DropDown />
          </div>
          <button
            type="button"
            className=" px-4 text-center "
            onClick={handleCart}
          >
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
            <div className="w-5 h-5  text-[12px] text-gray-100 absolute top-8 bg-black rounded-xl ">
              {/* {cartItems.length} */}
            </div>
          </button>

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4  md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li
              className="block py-2 px-3 cursor-pointer text-gray-900  rounded md:bg-transparent  md:p-0 "
              onClick={() => handleCategory("furniture")}
              aria-current="page"
            >
              가구
              {menu === "furniture" ? (
                <hr className="w-full h-1 rounded-sm bg-sky-300" />
              ) : (
                <></>
              )}
            </li>

            <li
              onClick={() => handleCategory("electric")}
              className="block py-2 px-3 cursor-pointer  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              전자기기
              {menu === "electric" ? (
                <hr className="w-full h-1 rounded-sm bg-sky-300" />
              ) : (
                <></>
              )}
            </li>

            <li
              onClick={() => handleCategory("small-item")}
              className="block py-2 px-3 cursor-pointer  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              소품
              {menu === "small-item" ? (
                <hr className="w-full h-1 rounded-sm bg-sky-300" />
              ) : (
                <></>
              )}
            </li>

            {/* <li>
            <a
              href="#"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Contact
            </a>
          </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

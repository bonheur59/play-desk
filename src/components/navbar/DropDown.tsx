import AuthContext from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebaseApp";
// import User from "@/assets/user.svg?react";
import React from "react";

const DropDown = React.memo(() => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // 드롭 다운 요소의 참조를 저장

  useEffect(() => {
    // 드롭 다운 외의 영역을 클릭했을 때 드롭 다운을 닫음
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // document에 클릭 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 unmount될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

  const handleMypage = async () => {
    navigate("users/profile");
    setIsOpen((prev) => !prev);
  };

  const onSignIn = async () => {
    navigate("/users/login");
  };
  return (
    <div
      className="relative flex flex-col items-center  h-auto "
      ref={dropdownRef}
    >
      {user ? (
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          className="p-2 w-full flex items-center justify-between"
        >
          <div className="w-10 h-10 rounded-full  overflow-hidden border-2 dark:border-white border-gray-400">
            {/* <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="w-full h-full object-cover"
            /> */}
            {/* <User className="w-full h-full p-1 object-cover" /> */}
          </div>
        </button>
      ) : (
        <button onClick={onSignIn}>로그인</button>
      )}

      {isOpen && (
        <div className="absolute border bg-white w-24 top-14 flex flex-col items-start rounded-lg p-2 text-sm z-50">
          <div className="flex w-full hover:bg-slate-200 cursor-pointer rounded-md p-1 mb-2">
            <h3 onClick={handleMypage}>마이페이지</h3>
          </div>
          <div className="flex w-full hover:bg-slate-200 cursor-pointer rounded-md p-1 mb-2">
            <h3 onClick={onSignOut}>로그아웃</h3>
          </div>
        </div>
      )}
    </div>
  );
});

export default DropDown;

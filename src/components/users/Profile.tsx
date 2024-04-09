import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebaseApp";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // const onSignOut = async () => {
  //   try {
  //     await logout();
  //     navigate("/");
  //   } catch (error) {
  //     console.error("로그아웃 에러:", error);
  //   }
  // };

  return (
    <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">내 프로필</h2>
          <p>프로필 페이지 입니다.</p>
          {/* <div className="grid max-w-2xl mx-auto mt-8">
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <User className="object-cover w-40 h-40 p-2 rounded-full ring-4 ring-gray-300 dark:ring-indigo-500" />
              <div className="flex gap-4 sm:ml-8">
                <button
                  type="button"
                  className="py-2 px-2  text-sm text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-gray-200 hover:bg-indigo-900 focus:ring-gray-200 "
                >
                  사진 변경
                </button>
                <button
                  type="button"
                  className="py-2 px-2  text-sm text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142]  focus:ring-indigo-200 "
                >
                  사진 삭제
                </button>
              </div>
            </div>

            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your first name"
                    value={user?.nickName || "사용자"}
                    required
                  />
                </div>
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  value={user?.email}
                  placeholder="your.email@mail.com"
                  readOnly
                  required
                />
              </div>

              <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Save
              </button>
            </div>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default Profile;

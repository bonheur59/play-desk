import Aside from "@/components/aside/Aside";
import { Outlet } from "react-router-dom";

const MypageLayout = () => {
  return (
    <>
      <div className="bg-white w-full flex flex-col px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <Aside />
        <Outlet />
      </div>
    </>
  );
};

export default MypageLayout;

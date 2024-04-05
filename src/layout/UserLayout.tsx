import { ReactNode } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 font-['Pretendard-Regular']">
      <div className="flex flex-col w-96 p-6 shadow-sm items-center justify-center gap-4 bg-white rounded-md">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;

import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";

const Aside = () => {
  const pathName = useLocation().pathname;

  const menus = [
    { name: "주문 내역", path: "/users/myorder" },
    { name: "회원 관리", path: "/users/profile" },
  ];

  return (
    <aside className="hidden py-4 md:w-1/3 lg:w-1/5 md:block ">
      <div className="sticky h-full flex flex-col gap-2 py-10 text-sm border-r border-indigo-100 top-12">
        <div className="sidebar">
          <ul>
            {menus.map((menu, index) => {
              return (
                <li key={index} className="mb-10">
                  <Link to={menu.path}>
                    <SidebarItem
                      menu={menu}
                      isActive={pathName === menu.path ? true : false}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Aside;


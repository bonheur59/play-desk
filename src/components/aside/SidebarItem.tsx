interface MenuItem {
  name: string;
  path: string;
}

interface AsideProps {
  menu: MenuItem;
  isActive: boolean;
}

const SidebarItem = ({ menu, isActive }: AsideProps) => {
  return isActive === true ? (
    <div className="flex items-center font-bold bg-white  text-indigo-900  rounded-full">
      <p>{menu.name}</p>
    </div>
  ) : (
    <div className="sidebar-item ">
      <p>{menu.name}</p>
    </div>
  );
};

export default SidebarItem;

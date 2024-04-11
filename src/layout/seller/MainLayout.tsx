import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SellerListLayout = ({ children }: Props) => {
  if (!Array.isArray(children) || children.length < 3) {
    throw new Error("MainLayout component requires exactly two children.");
  }

  return (
    <main className="flex flex-col w-full max-h-full p-5 overflow-hidden overflow-y-scroll">
      {/* title */}
      <div className="pb-6 space-y-4 border-b lg:flex lg:items-center lg:space-y-0 lg:flex-row">
        {children[0]}
      </div>
      {/* title */}
      {/* subtitle */}
      <div className="mt-6 text-xl">{children[1]}</div>
      {/* subtitle */}
      {/* content 1*/}
      {children[2]}
      {/* <div className="mt-6 overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md"></div>
        </div>
      </div> */}
      {/* content 1*/}
      {/* content 2*/}
      <div className="mt-6 overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          {children[3]}
        </div>
      </div>
      {/* content 2*/}
    </main>
  );
};

export default SellerListLayout;

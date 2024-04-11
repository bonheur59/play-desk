import { ReactNode } from "react";

interface Props {
  children : ReactNode;
}

const TableLayout = ({ children }: Props) => {

  if (!Array.isArray(children) || children.length < 2) {
    throw new Error("TableLayout component requires exactly two children.");
  }
  
  return (
    <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
      <thead className="bg-gray-50">{children[0]}</thead>
      <tbody className="divide-y divide-gray-200">{children[1]}</tbody>
    </table>
  );
};

export default TableLayout;

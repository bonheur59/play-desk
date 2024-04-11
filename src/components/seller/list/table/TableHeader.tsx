const TableHeader = () => {
  // 헤더 열을 배열로 정의
  const columns = [
    "Name",
    "Description",
    "Category",
    "Price",
    "Quantity",
  ];

  // 중복되는 클래스명과 속성값을 변수로 추출
  const columnHeaderClasses =
    "px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase";

  return (
    <tr>
      {/* 배열을 매핑하여 헤더 열을 생성 */}
      {columns.map((column, index) => (
        <th key={index} scope="col" className={columnHeaderClasses}>
          {column}
        </th>
      ))}
      <th scope="col" className="relative px-6 py-3">
        <span className="sr-only">Edit</span>
      </th>
    </tr>
  );
};

export default TableHeader;

// const TableHeader = () => {
//   return (
//     <tr>
//       <th
//         scope="col"
//         className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
//       >
//         Name
//       </th>
//       <th
//         scope="col"
//         className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
//       >
//         Description
//       </th>
//       <th
//         scope="col"
//         className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
//       >
//         Category
//       </th>
//       <th
//         scope="col"
//         className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
//       >
//         Price
//       </th>
//       <th
//         scope="col"
//         className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
//       >
//         Quantity
//       </th>
//       <th scope="col" className="relative px-6 py-3">
//         <span className="sr-only">Edit</span>
//       </th>
//     </tr>
//   );
// };

// export default TableHeader;

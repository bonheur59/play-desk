import React from "react";
import { Link } from "react-router-dom";

interface FileItem {
  imageFile: string; // 데이터 URL 형태의 이미지 파일
}

interface Product {
  category: string;
  content: string;
  createdAt: string;
  files: FileItem[];
  id: string;
  price: number;
  quantity: number;
  sellerUid: string;
  title: string;
}

interface SellerItemProps {
  item: Product; // item 속성의 타입을 Product로 지정
  handleDelete: (itemId: string) => void;
}

const SellerItem = ({ item, handleDelete }: SellerItemProps) => {
  const getCategoryKoreanName = (englishCategory: string) => {
    switch (englishCategory) {
      case "furniture":
        return "가구";
      case "electric":
        return "전자제품";
      case "small-item":
        return "소품";
      default:
        return englishCategory;
    }
  };

  console.log("전달받은 data 입니다. ", item);
  return (
    <>
      <td className="px-6 py-6 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-24 h-24">
            <img
              className="w-full h-full object-cover rounded"
              src={item.files[0].imageFile}
              alt={`Product Image 1`}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 ">
              {item.title}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm w-80 text-gray-900 text-ellipsis whitespace-nowrap overflow-hidden">
          {item.content}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {" "}
          {getCategoryKoreanName(item.category)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex px-2 text-xs  leading-5  rounded-full">
          ₩ {item.price}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
        {item.quantity}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <button type="button" className="text-indigo-600 hover:text-indigo-900">
          <Link to={`/seller/edit/${item?.id}`}> 수정 </Link>
        </button>
        <button
          className="text-red-600 hover:text-indigo-900 ml-4"
          onClick={() => {
            handleDelete(item?.id);
          }}
        >
          삭제
        </button>
      </td>
    </>
  );
};

export default SellerItem;

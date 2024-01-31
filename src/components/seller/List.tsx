import {
  collection,
  deleteDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseApp";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { Link } from "react-router-dom";

interface ProductProps {
  id: string;
  sellerId: string;
  title: string;
  content: string;
  createdAt: string;
  uid: string;
}

const List = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const { user } = useContext(AuthContext);

  const getProduct = async () => {
    //products 초기화
    setProducts([]);
    const productsRef = collection(db, "Product");

    if (user?.uid) {
      const productQuery = query(productsRef, where("uid", "==", user?.uid));
      const datas = await getDocs(productQuery);

      datas?.forEach((doc) => {
        const dataObj = { ...doc.data(), id: doc.id };
        setProducts((prev) => [...prev, dataObj as ProductProps]);
      });
    }
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "Product", id));
      alert("게시글이 삭제되었습니다.");
      getProduct();
    }
  };

  useEffect(() => {
    if (user) {
      getProduct();
    }
  }, [user]);

  return (
    <tbody>
      {products?.length > 0 ? (
        products?.map((item, index) => (
          <tr
            key={item?.id}
            className="bg-white divide-y divide-gray-200 transition-all hover:bg-gray-100 hover:shadow-lg"
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    ahmed.kamel@example.com
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">설명</div>
              <div className="text-sm text-gray-500">Optimization</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                Active
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              Admin
            </td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-900"
              >
                <Link to={`/seller/edit/${item?.id}`}>수정 </Link>
              </button>
              <button
                className="text-red-600 hover:text-indigo-900 ml-4"
                onClick={() => {
                  handleDelete(item.id as string);
                }}
              >
                삭제
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td className="px-6 py-4 text-center text-gray-500">
            게시글이 없습니다.
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default List;

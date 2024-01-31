import { useCallback, useContext, useEffect, useState } from "react";
import {
  doc,
  addDoc,
  Timestamp,
  collection,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebaseApp";
import AuthContext from "@/context/AuthContext";

import { useNavigate, useParams } from "react-router-dom";
import { update } from "firebase/database";

interface ProductProps {
  id: string;
  sellerId: string;
  title: string;
  content: string;
  createdAt: string;
  uid: string;
}

const EditForm = () => {
  const params = useParams();
  const [products, setProducts] = useState<ProductProps | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFileUpload = () => {};

  const getProduct = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "Product", params.id);
      const docSnap = await getDoc(docRef);
      setProducts({ ...(docSnap?.data() as ProductProps), id: docSnap.id });
      setTitle(docSnap.data()?.title);
      setContent(docSnap.data()?.content);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) getProduct();
  }, [getProduct, params.id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (products) {
        const productRef = doc(db, "Product", products.id);
        await updateDoc(productRef, {
          title: title,
          content: content,
          updatedAt: new Date().toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        });
      }
      setTitle("");
      setContent("");
      navigate(`/seller/list`);
      alert("상품을 수정했습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name == "title") {
      setTitle(value);
    }

    if (name == "content") {
      setContent(value);
    }
  };

  return (
    <div className="flex lex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-96 p-6 shadow-sm items-center justify-center gap-4 bg-white rounded-md"
      >
        <div className="form_block">
          <label>제목</label>
          <input
            type="text"
            name="title"
            id="title"
            className="outline"
            onChange={onChange}
            value={title}
            required
          />
        </div>
        <div className="form_block">
          <label>내용</label>
          <textarea
            name="content"
            className="outline"
            onChange={onChange}
            required
            value={content}
          />
        </div>
        <button type="submit" className="w-full mt-5 bg-main-color">
          제출
        </button>
      </form>
    </div>
  );
};

export default EditForm;

import { useContext, useState } from "react";
import { doc, addDoc, Timestamp, collection } from "firebase/firestore";
import { db } from "@/firebaseApp";
import AuthContext from "@/context/AuthContext";

import { useNavigate } from "react-router-dom";

const Form = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Product"), {
        title: title,
        content: content,
        createdAt: new Date().toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        sellerId: user?.email,
        uid: user?.uid,
      });
      alert("상품을 생성했습니다.");
      navigate("/seller/list");
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

export default Form;

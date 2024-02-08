import { useCallback, useContext, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebaseApp";
import AuthContext from "@/context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

interface ProductProps {
  id: string;
  sellerId: string;
  title: string;
  price: string;
  quantity: string;
  content: string;
  imageUrls: string[];
  createdAt: string;
  uid: string;
}

const EditForm = () => {
  const params = useParams();
  const [products, setProducts] = useState<ProductProps | null>(null);
  const initialState = {
    title: "",
    content: "",
    price: "",
    quantity: "",
  };
  const [formState, setFormState] = useState(initialState);
  const [imageFiles, setImageFiles] = useState<Array<Blob>>([]);
  const [prevImg, setPrevImg] = useState<Array<Blob | null>>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = [...imageFiles];
    const newPreviews = [...prevImg];

    for (let i = 0; i < e.target.files!.length; i++) {
      const file = e.target.files![i];
      // 이미지 파일 3개로 제한
      if (newImages.length < 3) {
        // 이벤트객체의 파일을 newImages에 담기
        newImages.push(file);
        // 파일리더 객체 생성
        const reader = new FileReader();
        // 파일 읽어온 후 실행되는 콜백함수
        reader.onload = (e: ProgressEvent<FileReader>) => {
          // 읽어온 값을 갱신하기
          newPreviews.push(e.target!.result as string);
          setPrevImg(newPreviews);
        };
        // 파일 객체를 읽어 base64 형태의 문자열로 변환
        reader.readAsDataURL(file);
      }
    }
    setImageFiles(newImages);
  };

  const getProduct = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "Product", params.id);
      const docSnap = await getDoc(docRef);
      console.log("docSnap", docSnap.data());
      setProducts({ ...(docSnap?.data() as ProductProps), id: docSnap.id });
      setImageFiles(docSnap.data()?.imageUrls);
      setPrevImg(docSnap.data()?.imageUrls);
      setFormState({
        title: docSnap.data()?.title,
        content: docSnap.data()?.content,
        price: docSnap.data()?.price,
        quantity: docSnap.data()?.quantity,
      });
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) getProduct();
  }, [getProduct, params.id]);


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (products) {
        if (products?.imageUrls) {
          products.imageUrls.map(async (imageUrl) => {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef).catch((error) => {
              console.log(error);
            });
          });
        }

        const imageUrls: string[] = [];

        //기존 사진 지우고 새로운 사진 업로드
        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i];
          const key = `${user?.uid}/${uuidv4()}`;
          const storageRef = ref(storage, key);

          // 이미지 업로드
          await uploadBytes(storageRef, file);

          // 이미지의 다운로드 URL 받아오기
          const imageUrl = await getDownloadURL(storageRef);
          imageUrls.push(imageUrl);
        }

        //이미지 업로드

        const productRef = doc(db, "Product", products.id);
        await updateDoc(productRef, {
          title: formState.title,
          content: formState.content,
          updatedAt: new Date().toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          price: formState.price,
          quantity: formState.quantity,
          imageUrls: imageUrls,
        });
      }
      setFormState({
        title: "",
        content: "",
        price: "",
        quantity: "",
      });
      setImageFiles([]);
      setPrevImg([]);
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

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteImg = (index: number) => {
    const newImages = [...imageFiles];
    const newPreviews = [...prevImg];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImageFiles(newImages);
    setPrevImg(newPreviews);
  };

  return (
    <div className="flex lex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-96 p-6 shadow-sm items-center justify-center gap-4 bg-white rounded-md"
      >
        {/* 이미지 업로드 area 시작 */}
        <div className="rounded-md border border-gray-100 bg-white p-4 shadow-md">
          <label
            htmlFor="upload"
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 fill-white stroke-indigo-500"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-gray-600 font-medium">이미지 업로드</span>
          </label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            multiple // 여러 개의 파일 선택을 허용
          />
          {prevImg?.map((preview, index) => (
            <div key={index}>
              <img
                src={preview}
                width={200}
                height={200}
                alt={`${preview}-${index}`}
              />
              <button className="" onClick={() => handleDeleteImg(index)}>
                삭제
              </button>
            </div>
          ))}
        </div>
        {/* 이미지 업로드 area 끝 */}
        <div className="form_block w-full">
          <label>제품 이름</label>
          <input
            type="text"
            name="title"
            id="title"
            className="outline"
            onChange={onChange}
            value={formState.title}
            required
          />
        </div>
        <div className="form_block w-full">
          <label>제품 설명</label>
          <textarea
            name="content"
            className="outline"
            onChange={onChange}
            required
            value={formState.content}
          />
        </div>
        <div className="form_block w-full">
          <label>제품 가격</label>
          <input
            type="text"
            name="price"
            id="price"
            className="outline"
            onChange={onChange}
            value={formState.price}
            required
          />
        </div>
        <div className="form_block w-full">
          <label>제품 수량</label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            className="outline"
            onChange={onChange}
            value={formState.quantity}
            required
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

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { useProductMutation } from "@/hooks/useProductsMutation";

const Form = () => {
  const initialState = {
    title: "",
    content: "",
    price: 0,
    quantity: 0,
    category: "furniture",
  };
  const [formState, setFormState] = useState(initialState);
  const [imageFiles, setImageFiles] = useState<Array<Blob>>([]);
  const [prevImg, setPrevImg] = useState<Array<string | null>>([]);
  const { user } = useContext(AuthContext);

  const { createProductMutation } = useProductMutation(); // useProductMutation 호출

  console.log("formState", formState);

  //이미지 파일 업로드 함수
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
        reader.onload = (e) => {
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

  //이미지를 삭제하는 함수
  const handleDeleteImg = (index: number) => {
    const newImages = [...imageFiles];
    const newPreviews = [...prevImg];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImageFiles(newImages);
    setPrevImg(newPreviews);
  };

  //form을 제출하는 함수
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createProductMutation.mutate({ ...formState, user, imageFiles, prevImg });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const {
      target: { name, value },
    } = e;

    setFormState((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setFormState((prev) => ({
      ...prev,
      category: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-100 p-6 shadow-sm items-center justify-center gap-4 bg-white rounded-md"
      >
        {/* 이미지 업로드 area 시작 */}
        <div className="rounded-md border border-gray-100 bg-white p-2 shadow-md">
          <label
            htmlFor="upload"
            className="flex flex-col items-center gap-2 cursor-pointer  mb-2 text-sm font-medium dark:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 fill-white stroke-indigo-500"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
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
        </div>
        <div>
          <div className="flex w-[390px] bg-slate-50 relative ">
            {prevImg?.map((preview, index) => (
              <div key={index}>
                <img
                  src={preview ?? undefined}
                  className="object-cover w-28 h-24 ml-3 mr-3 rounded"
                  alt={`${preview}-${index}`}
                />
                <div className="absolute top-0 ml-24">
                  <button className="" onClick={() => handleDeleteImg(index)}>
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 이미지 업로드 area 끝 */}
        <div className="form_block w-full">
          <label>제품 이름</label>
          <input
            type="text"
            name="title"
            id="title"
            className="block w-full px-4 py-3 mb-2 border mt-1 rounded bg-gray-50 "
            onChange={onChange}
            value={formState.title}
            required
          />
        </div>
        <div className="form_block w-full">
          <label>제품 설명</label>
          <textarea
            name="content"
            rows="3"
            className="block w-full px-4 py-3 mb-2 border mt-1 rounded bg-gray-50 "
            onChange={onChange}
            required
            value={formState.content}
          />
        </div>
        <div className="flex w-full gap-4">
          <div className="form_block ">
            <label
              htmlFor="categories"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              카테고리
            </label>
            <select
              id="categories"
              className="bg-gray-50 border  text-gray-900 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
              value={formState.category}
              onChange={(e) => onChangeCategory(e)}
            >
              <option value="furniture">가구</option>
              <option value="electric">전자제품</option>
              <option value="small-item">소품</option>
            </select>
          </div>
          <div className="form_block ">
            <label className="block">제품 가격</label>
            <input
              type="text"
              name="price"
              id="price"
              className="h-10 border mt-1 rounded px-4 w-40 bg-gray-50"
              onChange={onChange}
              value={formState.price}
              required
            />
          </div>
          <div className="form_block">
            <label className="block">제품 수량</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              className="h-10 border mt-1 rounded px-4 w-20 bg-gray-50"
              onChange={onChange}
              value={formState.quantity}
              required
            />
          </div>
        </div>
        <div className="inline-flex items-end">
          <button
            type="submit"
            className="py-2 px-4  h-10 mt-5 rounded bg-main-color text-white font-medium md:col-span-5 text-right"
          >
            제품 등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

import { useForm, useFieldArray, Controller } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import { ProductFormProps, ProductType } from "@/types/SellType";
import { ChangeEvent } from "react";

const CommonProductForm: React.FC<ProductFormProps> = ({
  isEditing,
  onSubmitHandler,
  defaultValues,
}) => {
  const { register, control, handleSubmit } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "files",
  });

  const onSubmit = (data: ProductType) => {
    onSubmitHandler(data);
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;

    if (newFiles) {
      // 각 파일에 대한 정보를 배열에 추가
      for (const file of newFiles) {
        await new Promise((resolve) => {
          Resizer.imageFileResizer(
            file,
            800,
            800,
            "WEBP",
            70,
            0,
            (uri) => {
              append({ imageFile: uri as string });
              resolve(uri);
            },
            "base64"
          );
        });
      }
    }
  };

  //input이 숫자인지 체크하는 함수
  const checkNumeric = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue !== "" && isNaN(parseFloat(inputValue))) {
      alert("숫자를 입력하세요.");
      // 입력이 숫자가 아닌 경우, price 필드를 비워줍니다.
      e.target.value = ""; // input value 초기화
    }
  };

  // 이미지를 삭제하는 함수
  const onClearImg = (index: number) => {
    // 인덱스에 해당하는 이미지를 삭제
    remove(index);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-100 p-6 shadow-sm items-center justify-center gap-4 bg-white rounded-md"
      >
        {/* 이미지 업로드 area 시작 */}
        <div className="rounded-md border border-gray-100 bg-white p-2 shadow-md">
          <label
            htmlFor="file-input"
            className="flex flex-col items-center gap-2 cursor-pointer mb-2 text-sm font-medium dark:text-gray-400"
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
          {/* 파일 입력 필드 등록 */}
          <input
            type="file"
            name="file-input"
            id="file-input"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            multiple
          />
        </div>
        <div>
          <div className="flex w-[390px] p-3 relative bg-slate-50">
            {/* 업로드된 이미지를 화면에 표시하는 부분 */}
            {fields.map((field, index) => (
              <div key={index}>
                <Controller
                  name={`files.${index}.imageFile`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <img
                      src={field.value}
                      alt={`업로드된 이미지 ${index + 1}`}
                      style={{ maxWidth: "100px" }}
                    />
                  )}
                />
                <button onClick={() => onClearImg(index)}>삭제</button>
              </div>
            ))}
          </div>
        </div>
        {/* 이미지 업로드 area 끝 */}
        <div className="form_block w-full">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="title"
            required
            {...register("title", { required: "이름을 입력하세요." })}
          />
        </div>
        <div className="form_block w-full">
          <label htmlFor="content">제품 설명</label>
          <textarea
            id="content"
            {...register("content")}
            rows={3}
            className="block w-full px-4 py-3 mb-2 border mt-1 rounded bg-gray-50"
            required
          />
        </div>
        <div className="flex w-full gap-4">
          <div className="form_block">
            <label
              htmlFor="categories"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              카테고리
            </label>
            <select
              id="categories"
              {...register("category")}
              className="bg-gray-50 border text-gray-900 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
            >
              <option value="furniture">가구</option>
              <option value="electric">전자제품</option>
              <option value="small-item">소품</option>
            </select>
          </div>
          <div className="form_block">
            <label className="block">제품 가격</label>
            <input
              type="text"
              id="price"
              {...register("price")}
              className="h-10 border mt-1 rounded px-4 w-40 bg-gray-50"
              onChange={checkNumeric}
              required
            />
          </div>
          <div className="form_block">
            <label className="block">제품 수량</label>
            <input
              type="number"
              id="quantity"
              {...register("quantity")}
              className="h-10 border mt-1 rounded px-4 w-20 bg-gray-50"
              onChange={checkNumeric}
              required
            />
          </div>
        </div>
        <div className="inline-flex items-end">
          <button
            type="submit"
            className="py-2 px-4 h-10 mt-5 rounded bg-main-color text-white font-medium md:col-span-5 text-right"
          >
            {isEditing ? "제품 수정" : "제품 등록"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommonProductForm;

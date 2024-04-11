import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "@/components/seller/common/CommonProductForm";
import { useCreateProduct } from "@/hooks/seller/useSellerProduct";
import { ProductType } from "@/types/SellType";
import queryClient from "@/queryClient";

const CreateProductForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { mutate: createProduct } = useCreateProduct();

  const onSubmitHandler = (data: ProductType) => {
    console.log("제출된 데이터:", data);

    const onSuccessCallback = () => {
      alert("상품이 등록되었습니다.");
      queryClient.invalidateQueries(["get-product", user?.uid]);
      navigate("/seller/list");
    };
    

    createProduct(
      { userId: user?.uid, data },
      {
        onSuccess: onSuccessCallback,
      }
    );
  };

  return <ProductForm isEditing={false} onSubmitHandler={onSubmitHandler} />;
};

export default CreateProductForm;

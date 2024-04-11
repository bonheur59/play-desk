import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import queryClient from "@/queryClient";
import ProductForm from "@/components/seller/common/CommonProductForm";
import {
  useEditProduct,
  useReadProductDetail,
} from "@/hooks/seller/useSellerProduct";
import { ProductType } from "@/types/SellType";

const EditProductForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: editProduct } = useEditProduct();
  const { data } = useReadProductDetail(id || "");

  const defaultValues: ProductType = data
    ? { ...data }
    : {
        id: "",
        title: "",
        content: "",
        category: "",
        price: 0,
        quantity: 0,
        sellUid: "",
        createdAt: "",
        files: [],
      };

  console.log("디폴트 밸류", defaultValues);

  const onSubmitHandler = (data: ProductType) => {
    console.log("수정된 데이터:", data);

    const onSuccessCallback = () => {
      alert("상품이 수정되었습니다.");
      queryClient.invalidateQueries(["get-product", user?.uid]);
      navigate("/seller/list");
    };

    if (user) {
      editProduct(
        { userId: user.uid, data, productId: id! },
        {
          onSuccess: onSuccessCallback,
        }
      );
    }
  };

  return (
    <ProductForm
      isEditing={true}
      onSubmitHandler={onSubmitHandler}
      defaultValues={defaultValues}
    />
  );
};

export default EditProductForm;

import AddProductButton from "@/components/seller/list/AddProductButton";
import SellerContent from "@/components/seller/list/SellerContent";
import SubTitle from "@/components/seller/common/SubTitle";
import Title from "@/components/seller/common/Title";
import SellerListLayout from "@/layout/seller/MainLayout";


const SellList = () => {
  return(
    <>
      <SellerListLayout>
        <Title />
        <SubTitle />
        <SellerContent />
        <AddProductButton />
      </SellerListLayout>
    </>
  );
};

export default SellList;

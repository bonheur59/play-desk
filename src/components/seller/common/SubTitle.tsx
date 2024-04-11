import { useLocation } from "react-router-dom";

const SubTitle = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {pathname === "/seller/listnew" ? (
        <h1>판매 상품 조회</h1>
      ) : (
        <h1>주문 조회</h1>
      )}
    </>
  );
};

export default SubTitle;

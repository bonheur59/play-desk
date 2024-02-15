import CartContext from "@/context/CartContext";
import AuthContext from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddToCartButton = ({ items }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const handleCartBtn = () => {
    if (isAddedToCart) {
      navigate("/shop/cart");
    } else {
      addToCart(items.id);
      setIsAddedToCart(true);
    }
  };

  return (
    <button
      className="py-4 px-14 text-[16px] bg-sky-500 outline-none cursor-pointer rounded-sm text-white mt-10 "
      onClick={handleCartBtn}
    >
      {isAddedToCart ? "장바구니 보기" : "장바구니에 추가"}
    </button>
  );
};

export default AddToCartButton;

// -------------------- 이전 코드 ------------------------------------------

// const { cartItems, cartMutation } = useCart();

// useQuery를 통해 데이터를 가져옴
// const { data: cartData, isLoading } = useQuery("carts", async () => {
//   const unsubscribe = onSnapshot(collection(db, "Carts"), (snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       const cartData = doc.data();
//       const existingCartItem = cartData.items.find(
//         (item) => item.id === items.id
//       );
//       setIsAddedToCart(!!existingCartItem);
//     });
//   });

//   // 언마운트 시 언서브스크라이브
//   return () => unsubscribe();
// });
// console.log("카트데이터", cartData);

// const handleAddToCart = async () => {
//   try {
//     if (user && user.uid) {
//       // 유저가 로그인된 경우
//       const existingCartItem = cartItems.find((item) => item.id === items.id);

//       // 이미 장바구니에 있는 상품이면 수량을 증가시킴
//       if (existingCartItem) {
//         const updatedCartItems = cartItems.map((item) =>
//           item.id === items.id
//             ? { ...item, cartQuantity: item.quantity + 1 }
//             : item
//         );
//         //옵티미스틱 업데이트
//         setIsAddedToCart(true);
//         cartMutation.mutate(updatedCartItems);
//         console.log("FireStore : 장바구니에 상품 수량 증가 성공!");
//       } else {
//         // 장바구니에 없는 상품이면 새로 추가
//         const newCartItem = { ...items, cartQuantity: 1 };
//         const updatedCartItems = [...cartItems, newCartItem]; // 추가 옵티미스틱 업데이트

//         // UI를 먼저 업데이트 (옵티미스틱 업데이트)
//         setIsAddedToCart(true);
//         cartMutation.mutate({ userId: user.uid, items: updatedCartItems });

//         console.log("FireStore : 장바구니에 상품 추가 성공!");
//       }
//     } else {
//       localStorage.setItem("cart", JSON.stringify(items)); //유저가 로그인되지 않은 경우 로컬 스토리지에 저장
//       console.log("LocalStorage : 장바구니에 추가 성공!");
//     }
//   } catch (error) {
//     console.error("장바구니에 추가 중 오류 발생 :", error);
//   }
// };

// const handleButtonClick = () => {
//   if (isAddedToCart) {
//     // 장바구니 보기
//     navigate("/shop/cart"); // 적절한 경로로 변경
//   } else {
//     // 장바구니에 추가
//     handleAddToCart();
//   }
// };

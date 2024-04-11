// import { createContext, useContext, useEffect, useState } from "react";
// import { useCartMutation } from "@/hooks/useCartMutation";
// import { useQuery } from "react-query";
// import AuthContext from "./AuthContext";
// import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
// import { db } from "@/firebaseApp";

// const CartContext = createContext(null);

// //상품 전체 정보를 fetch
// const fetchProducts = async () => {
//   //firebase의 docs를 판매자의 uid에 따라 가져옴
//   const productsRef = collection(db, "Product");
//   const productQuery = query(productsRef, orderBy("createdAt", "desc"));
//   const querySnapshot = await getDocs(productQuery);

//   const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   return data;
// };

// //장바구니 초기세팅 {"productid : 0"}
// const getDefatulCart = (productData) => {
//   let cart = {};

//   for (let i = 0; i < productData.length; i++) {
//     const productId = productData[i].id;
//     cart[productId] = 0;
//   }

//   return cart;
// };

// export const CartContextProvider = ({ children }) => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { isLoading, data, error } = useQuery(
//     "get-product",
//     () => fetchProducts(),
//     {
//       onSuccess: (data) => {
//         setAllProducts(data);

//         // 기본 장바구니 객체 생성
//         const defaultCart = getDefatulCart(data);

//         // localStorage에 저장된 값 불러오기
//         const storedCart = localStorage.getItem("cartItems");

//         // localStorage에 저장된 값이 있으면 그 값을 사용, 없으면 기본 장바구니 값을 사용
//         const cartToSet = storedCart ? JSON.parse(storedCart) : defaultCart;

//         // 상태 업데이트
//         setCartItems(cartToSet);
//       },
//     }
//   );

//   const [allProducts, setAllProducts] = useState([]);
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCart = localStorage.getItem("cartItems");
//     return storedCart ? JSON.parse(storedCart) : getDefatulCart(allProducts);
//   });

//   // 장바구니 업데이트 시 로컬 스토리지에도 반영
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems, data]);

//   //장바구니에 상품 추가(+ 1)
//   const addToCart = (itemId) => {
//     setCartItems((prev) => {
//       const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
//       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//       console.log("cartItems", updatedCart);
//       return updatedCart;
//     });
//   };

//   //장바구니에 상품 삭제(- 1)
//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => {
//       const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
//       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };

//   //장바구니 비우기
//   const clearCart = () => {
//     const defaultCart = getDefatulCart(data);
//     setCartItems(defaultCart);
//   };

//   //장바구니에 담긴 품목
//   const getTotalCart = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       console.log("아템", item);
//       if (cartItems[item] > 0) {
//         let itemInfo = allProducts.find((product) => product.id === item);
//         if (itemInfo && itemInfo.price) {
//           totalAmount += itemInfo.price * cartItems[item];
//         }
//       }
//     }
//     console.log("총", totalAmount);
//     return totalAmount;
//   };

//   //장바구니 총 가격
//   const getTotalCartItems = () => {
//     let totalItem = 0;
//     for (const item in cartItems) {
//       console.log("아템", item);
//       if (cartItems[item] > 0) {
//         totalItem += cartItems[item];
//       }
//     }
//     return totalItem;
//   };

//   //결제하는 상품 정보를 반환하는 함수
//   const getCheckoutItems = (selectedItems) => {
//     console.log("전달받았습니다.", selectedItems);

//     const checkoutItems = selectedItems
//       .map((productId) => {
//         const productInfo = allProducts.find(
//           (product) => product.id === productId
//         );

//         if (productInfo) {
//           const quantity = cartItems[productId] || 0;
//           return { ...productInfo, orderQuantity: quantity };
//         }

//         return null;
//       })
//       .filter(Boolean); // null인 항목 제거

//     console.log("결제 상품 정보:", checkoutItems);
//     return checkoutItems;
//   };

//   //결제 상품 총 가격
//   const getTotalcheckoutItems = (checkoutItems) => {
//     let totalPrice = 0;

//     checkoutItems.map(
//       (item) => (totalPrice += item.price * item.orderQuantity)
//     );

//     console.log("가격", totalPrice);

//     return totalPrice;
//   };

//   const contextValue = {
//     cartItems,
//     allProducts,
//     addToCart,
//     clearCart,
//     removeFromCart,
//     getTotalCart,
//     getTotalCartItems,
//     getCheckoutItems,
//     getTotalcheckoutItems,
//   };

//   return (
//     <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
//   );
// };

// export default CartContext;

// // const fetchFireStoreData = async (userId: string) => {
// //   try {
// //     // "Carts" 컬렉션에서 해당 사용자의 장바구니 데이터를 가져옴
// //     const cartsRef = collection(db, "Carts");
// //     const cartQuery = query(cartsRef, where("userId", "==", userId));
// //     const querySnapshot = await getDocs(cartQuery);

// //     // 가져온 데이터를 배열로 변환
// //     const data = querySnapshot.docs.map((doc) => ({
// //       id: doc.id,
// //       ...doc.data(),
// //     }));

// //     // 장바구니 데이터 반환
// //     return data;
// //   } catch (error) {
// //     console.error("Firestore에서 데이터 가져오기 실패:", error);
// //     throw error;
// //   }
// // };

// // export const CartProvider = ({ children }) => {
// //   const { user } = useContext(AuthContext); //로그인 된 사용자 정보
// //   const [cartItems, setCartItems] = useState([]); //장바구니 데이터를 저장할 상태
// //   const cartMutation = useCartMutation();

// // useEffect(() => {
// //   const fetchData = async () => {
// //     try {
// //       // 사용자가 로그인된 경우 FireStore에서 데이터롤 가져오기
// //       if (user) {
// //         const data = await fetchFireStoreData(user.uid);
// //         setCartItems(data);
// //       } else {
// //         // 사용자가 로그인되지 않은 경우 locatStorage에서 데이터 가져오기
// //         const data = localStorage.getItem("cart");
// //         if (data) {
// //           setCartItems(JSON.parse(data));
// //         }
// //       }
// //     } catch (error) {
// //       console.error("데이터 가져오기 실패", error);
// //     }
// //   };
// //   fetchData();
// // }, [user]);

// //   return (
// //     <CartContext.Provider value={{ cartMutation, cartItems }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // export const useCart = () => {
// //   const context = useContext(CartContext);
// //   if (!context) {
// //     throw new Error("useCart must be used within a CartProvider");
// //   }
// //   return context;
// // };

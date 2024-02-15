import { useContext, useState } from "react";
import CartContext from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

const CartItem = () => {
  const [selectItem, setSelectItem] = useState([]);
  const { cartItems, allProducts, addToCart, removeFromCart, getTotalCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  console.log("cartItems", cartItems);

  const handleCheckboxChange = (productId) => {
    // 해당 상품이 이미 체크되어 있는지 확인
    const isChecked = selectItem.includes(productId);

    // 체크 상태를 업데이트
    if (isChecked) {
      setSelectItem(selectItem.filter((id) => id !== productId));
    } else {
      setSelectItem([...selectItem, productId]);
    }
  };

  return (
    <>
      {" "}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {allProducts &&
                  Array.isArray(allProducts) &&
                  allProducts.map(
                    (e) =>
                      cartItems[e.id] > 0 && (
                        <ul className="-my-8">
                          <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                            <input
                              id={`product-checkbox-${e.id}`}
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              onChange={() => handleCheckboxChange(e.id)}
                              checked={selectItem.includes(e.id)}
                            />
                            <div className="shrink-0">
                              <img
                                className="h-24 w-24 max-w-full rounded-lg object-cover"
                                src={e.imageUrls[0]}
                                alt=""
                              />
                            </div>

                            <div className="relative flex flex-1 flex-col justify-between">
                              <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                <div className="pr-8 sm:pr-5">
                                  <p className="text-base font-semibold text-gray-900">
                                    {e.title}
                                  </p>
                                </div>

                                <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                  <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                    {e.price}
                                  </p>

                                  <div className="sm:order-1">
                                    <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                      <button
                                        className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                        onClick={() => {
                                          removeFromCart(e.id);
                                        }}
                                      >
                                        -
                                      </button>
                                      <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                        {cartItems[e.id]}
                                      </div>
                                      <button
                                        className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                        onClick={() => {
                                          addToCart(e.id);
                                        }}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                <button
                                  type="button"
                                  className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                >
                                  <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"
                                      className=""
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </li>
                          {e.price * cartItems[e.id]}
                        </ul>
                      )
                  )}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  <span className="text-xs font-normal text-gray-400">
                    {getTotalCart()}
                  </span>{" "}
                </p>
              </div>

              {/* 결제 버튼 시작 */}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                  onClick={() => {
                    navigate("/shop/checkout", { state: { key: { selectItem } } });
                  }}
                >
                  주문하기
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
              {/* 결제 버튼 끝 */}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <>

  {
    /* <div classNameName="flow-root">
        {allProducts &&
          Array.isArray(allProducts) &&
          allProducts.map(
            (e) =>
              cartItems[e.id] > 0 && (
                <ul classNameName="-my-8">
                  <li classNameName="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div classNameName="shrink-0">
                      <img
                        classNameName="h-24 w-24 max-w-full rounded-lg object-cover"
                        src={e.imageUrls}
                        alt=""
                      />
                    </div>

                    <div classNameName="relative flex flex-1 flex-col justify-between">
                      <div classNameName="sm:col-gap-5 sm:grid sm:grid-cols-2">
                        <div classNameName="pr-8 sm:pr-5">
                          <p classNameName="text-base font-semibold text-gray-900">
                            상품명
                          </p>
                          <p classNameName="mx-0 mt-1 mb-0 text-sm text-gray-400">
                            {e.title}
                          </p>
                        </div>

                        <div classNameName="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                          <p classNameName="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                            가격
                          </p>
                          {e.price}
                        </div>
                        <div classNameName="sm:order-1">
                          <div classNameName="mx-auto flex h-8 items-stretch text-gray-600">
                            <button
                              classNameName="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                              onClick={() => {
                                removeFromCart(e.id);
                              }}
                            >
                              -
                            </button>
                            <div classNameName="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                              {cartItems[e.id]}
                            </div>
                            <button
                              classNameName="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                              onClick={() => {
                                addToCart(e.id);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div classNameName=" top-0 right-0 flex sm:bottom-0 sm:top-auto">
                        <button
                          type="button"
                          classNameName="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                        >
                          <svg
                            classNameName="block h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                              classNameName=""
                            ></path>
                          </svg>
                        </button>
                      </div>

                      <div classNameName="mt-6 flex items-center justify-between">
                        <p classNameName="text-sm font-medium text-gray-900">
                          Total
                        </p>
                        <p classNameName="text-2xl font-semibold text-gray-900">
                          <span classNameName="text-xs font-normal text-gray-400">
                            USD
                          </span>{" "}
                          408.00
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              )
          )}
      </div> */
  }
  //   </>
  // );
};

export default CartItem;

// <>
// <div classNameName="flow-root">
//   {cartItems.map((cartItem) =>
//     // 각 항목의 items 배열 순회
//     cartItem.items.map((item) => (
//       <>
//         <ul classNameName="-my-8">
//           <li classNameName="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
//             <div classNameName="shrink-0">
//               <img
//                 classNameName="h-24 w-24 max-w-full rounded-lg object-cover"
//                 src={item.imageUrls}
//                 alt=""
//               />
//             </div>

//             <div classNameName="relative flex flex-1 flex-col justify-between">
//               <div classNameName="sm:col-gap-5 sm:grid sm:grid-cols-2">
//                 <div classNameName="pr-8 sm:pr-5">
//                   <p classNameName="text-base font-semibold text-gray-900">
//                     {item.title}
//                   </p>
//                   <p classNameName="mx-0 mt-1 mb-0 text-sm text-gray-400">
//                     36EU - 4US
//                   </p>
//                 </div>

//                 <div classNameName="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
//                   <p classNameName="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
//                     {item.price}
//                   </p>

//                   <div classNameName="sm:order-1">
//                     <div classNameName="mx-auto flex h-8 items-stretch text-gray-600">
//                       <button classNameName="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">
//                         -
//                       </button>
//                       <div classNameName="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
//                         {item.cartQuantity}
//                       </div>
//                       <button classNameName="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div classNameName="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
//                 <button
//                   type="button"
//                   classNameName="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
//                 >
//                   <svg
//                     classNameName="block h-5 w-5"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                       classNameName=""
//                     ></path>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </li>
//         </ul>
//       </>
//     ))
//   )}
// </div>
// </>

import AuthContext from "@/context/AuthContext";
import CartContext from "@/context/CartContext";
import { db } from "@/firebaseApp";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

const fetchProducts = async (userId: string) => {
  //firebase의 docs를 판매자의 uid에 따라 가져옴
  const orderRef = collection(db, "Order");
  const orderQuery = query(orderRef, where("buyerId", "==", userId));
  const querySnapshot = await getDocs(orderQuery);

  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
};

const OrderList = () => {
  const { user } = useContext(AuthContext);
  //useQuery 훅을 사용하여 데이터를 가져오기
  const { data, isLoading, error } = useQuery(
    ["get-orderlist", user?.uid],
    () => fetchProducts(user?.uid)
  );

  console.log("데타", data);

  return (
    <>
    {data?.map((item) => <div>{item.title}</div>)}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                <ul className="-my-8">
                  <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div className="shrink-0">
                      <img
                        className="h-24 w-24 max-w-full rounded-lg object-cover"
                        alt=""
                      />
                    </div>

                    <div className="relative flex flex-1 flex-col justify-between">
                      <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                        <div className="pr-8 sm:pr-5">
                          <p className="text-base font-semibold text-gray-900">
                            {/* {e.title} */}
                          </p>
                        </div>

                        <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                          <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                            {/* {e.price} */}
                          </p>

                          <div className="sm:order-1">
                            <div className="mx-auto flex h-8 items-stretch text-gray-600">
                              <button
                                className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                onClick={() => {
                                  //   removeFromCart(e.id);
                                }}
                              >
                                -
                              </button>
                              <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                {/* {cartItems[e.id]} */}
                              </div>
                              <button
                                className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                onClick={() => {
                                  //   addToCart(e.id);
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
                  {/* {e.price * cartItems[e.id]} */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;

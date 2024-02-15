import { useContext, useEffect, useState } from "react";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CartContext from "@/context/CartContext";
import { useOrderMutation } from "@/hooks/useOrderMutation";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const { clearCart, getCheckoutItems, getTotalcheckoutItems } =
    useContext(CartContext);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { register, handleSubmit, setValue, getValues } = useForm();

  const { createOrderMutaion } = useOrderMutation(); // useOrderMutation 호출

  const location = useLocation();
  const { selectItem } = location.state.key;

  const checkoutItems = getCheckoutItems(selectItem);

  //아임포트 결제 함수
  const handlePayment = (data) => {
    const { IMP } = window;
    IMP.init(import.meta.env.VITE_IMP); //env 변경

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const { success, error_msg } = response;

    if (success) {
      alert("결제 성공");
      // 결제 후에 장바구니 비우기
      clearCart();
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

  //주소 찾기 함수
  const handleComplete = (data: Address) => {
    console.log("데이터", data);
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setValue("buyer_postcode", data.zonecode);
    setValue("buyer_addr", data.address);
    setDialogOpen(false);
  };

  const onSubmit = (data) => {
    //결제사항 fireStore에 저장
    createOrderMutaion.mutate([...checkoutItems]);

    console.log("데이터", data);

    const paymentData = {
      pg: "html5_inicis", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: getTotalcheckoutItems(checkoutItems), // 결제금액
      name: checkoutItems[0].title + "외", // 주문명
      buyer_name: data.buyer_name, // 구매자 이름
      buyer_tel: data.buyer_tel, // 구매자 전화번호
      buyer_email: "example@example", // 구매자 이메일
      buyer_addr: data.buyer_addr, // 구매자 주소
      buyer_postcode: data.buyer_postcode, // 구매자 우편번호
    };

    handlePayment(paymentData);
  };

  return (
    <section className="h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-900">주문정보</h1>
        </div>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-2xl md:mt-12">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <div className="relative flex flex-1 flex-col justify-between">
                    <div className="sm:col-gap-5 sm:grid sm:grid-cols-2 mb-3">
                      주문자 정보
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex">
                        <label className="">이름</label>
                        <input
                          className="block px-4 py-3 ml-10 border mt-1 rounded bg-gray-50 "
                          {...register("buyer_name")}
                        />
                      </div>

                      <div className="">
                        <div className="flex">
                          <div>
                            <div>
                              <label className="">주소</label>
                            </div>
                            <input
                              type="text"
                              className="block px-4 py-3 ml-10 border mt-1 rounded bg-gray-50"
                              disabled // input 필드를 비활성화합니다.
                              value={getValues("buyer_postcode")}
                              {...register("buyer_postcode")}
                            />
                          </div>
                          <div>
                            <Dialog
                              open={isDialogOpen}
                              onOpenChange={setDialogOpen}
                            >
                              <DialogTrigger
                                className="p-3 bg-slate-100 text-sm m-3"
                                onClick={() => setDialogOpen(true)}
                              >
                                우편번호 검색
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>우편번호 검색</DialogTitle>
                                  <DialogDescription>
                                    <DaumPostcodeEmbed
                                      onComplete={handleComplete}
                                    />
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div>
                          <input
                            type="text"
                            className="block px-4 py-3 ml-10 border mt-1 rounded bg-gray-50 w-5/6"
                            value={getValues("buyer_addr")}
                            disabled // input 필드를 비활성화합니다.
                            {...register("buyer_addr")}
                          />
                        </div>
                      </div>

                      <div className="flex">
                        <label className="">전화번호</label>
                        <input
                          type="text"
                          className="block px-4 py-3 ml-3 border mt-1 rounded bg-gray-50 "
                          {...register("buyer_tel")}
                        />
                      </div>
                      {/* 상품정보 시작 */}
                      <div className="flow-root">
                        {checkoutItems.map((item) => (
                          <ul className="-my-8">
                            <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                              <div className="shrink-0">
                                <img
                                  className="h-24 w-24 max-w-full rounded-lg object-cover"
                                  src={item.imageUrls[0]}
                                  alt=""
                                />
                              </div>

                              <div className="relative flex flex-1 flex-col justify-between">
                                <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                  <div className="pr-8 sm:pr-5">
                                    <p className="text-base font-semibold text-gray-900">
                                      {item.title}
                                    </p>
                                  </div>

                                  <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                    <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                      {item.price}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  수량 <span>{item.orderQuantity}</span>
                                </div>
                              </div>
                            </li>

                            {/* {e.price * cartItems[item.id]} */}
                          </ul>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          Total
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          <span className="text-xs font-normal text-gray-400">
                            {getTotalcheckoutItems(checkoutItems)}
                          </span>{" "}
                        </p>
                      </div>
                      {/* 상품정보 끝 */}

                      {/* 결제버튼 시작 */}
                      <div className="mt-6 text-center">
                        <button
                          type="submit"
                          className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                          onClick={handlePayment}
                        >
                          결제
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
                      {/* 결제버튼 끝 */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;

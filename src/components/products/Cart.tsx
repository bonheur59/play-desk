import React from "react";
import CartItem from "./CartItem";

const CartComponent = () => {
  return (
    <section className="h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
        </div>

        <CartItem />
      </div>
    </section>
  );
};

export default CartComponent;

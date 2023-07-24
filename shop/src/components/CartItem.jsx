import React, { useContext } from "react";

import { getProductData } from "../productList";
import { CartContext } from "../cartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const CartItem = ({ item }) => {
  const cart = useContext(CartContext);
  const id = item.id;
  const productData = getProductData(id);

  return (
    <div className='w-full border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-700 text-left rounded-xl py-4 px-4 max-w-5xl mx-auto'>
      <div className='flex gap-4'>
        <img
          src={productData.img_main}
          alt={productData.title}
          className='h-16 m-auto w-16 md:h-24 md:w-24 rounded-xl'
        />
        <div className='flex justify-between my-auto w-full'>
          <div>
            <h1 className='text-xl md:text-3xl font-bold text-left'>
              {productData.title}
            </h1>
            <p className='text-left font-semibold text-gray-600 dark:text-gray-300 text-sm md:text-base'>
              {productData.price} CHF
            </p>
          </div>
          <FontAwesomeIcon
            icon={faTrashCan}
            className='text-2xl my-auto cursor-pointer hover:scale-105 duration-200'
            onClick={() => cart.removeFromCart(productData.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;

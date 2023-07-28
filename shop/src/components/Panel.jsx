import React, { useState, useEffect } from "react";

const Panel = ({ id, price, img, link, title }) => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/product-data?productId=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((product) => {
        setProductData(product);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div className='border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-700 rounded-2xl w-9/12 md:w-auto p-4 hover:scale-105 duration-200 mx-auto md:mx-0'>
      <a href={link}>
        <img className='p-2 w-96 mx-auto rounded-3xl' src={img} alt='' />
        <h1 className='font-bold text-2xl text-center'>{title}</h1>
        <p className='font-bold'>
          {price} CHF{" "}
          {productData && productData.active == false ? (
            <span className='font-bold text-red-500'>Out of stock</span>
          ) : null}
        </p>
      </a>
    </div>
  );
};

export default Panel;

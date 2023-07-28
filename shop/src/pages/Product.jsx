import React from "react";
import { CartContext } from "../cartContext";
import { useContext, useEffect, useState } from "react";

const Product = ({ product }) => {
  const cart = useContext(CartContext);
  const inCart = cart.isInCart(product.id);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_SERVER_URL}/product-data?productId=${product.id}`
    )
      .then((response) => {
        return response.json();
      })
      .then((product) => {
        setProductData(product);
      })
      .catch((error) => console.error(error));
  }, [product.id]);

  return (
    <div>
      <div className='productContainer'>
        <img src={product.img_main} alt='' className='productImageMain' />
        <div className='my-auto'>
          <h1 className='productTitle'>{product.title}</h1>
          <div className='productDescContainer'>
            {!inCart ? (
              <button
                disabled={productData && productData.active == false}
                className='border border-gray-400 py-1 px-2 rounded-lg hover:scale-105 duration-200 text-xl md:text-2xl font-bold'
                onClick={() => cart.addOneToCart(product.id)}
              >
                {productData && productData.active == false ? (
                  <span className='text-red-500'>Out of Stock</span>
                ) : (
                  <span>CHF {product.price} - Add to cart</span>
                )}
              </button>
            ) : (
              <button
                className='border border-gray-400 py-1 px-2 rounded-lg hover:scale-105 duration-200 text-xl md:text-2xl font-bold'
                onClick={() => cart.deleteFromCart(product.id)}
              >
                Remove from Cart
              </button>
            )}
          </div>
          <h2 className='productH2'>Short description:</h2>
          <p className='text-sm md:text-lg m-4'>
            Designed by {product.designer} <br /> {product.description}
          </p>
          <h2 className='productH2'>Details:</h2>
          <ul className='productList'>
            <li>{product.parts} Parts</li>
          </ul>
        </div>
      </div>
      <div id='gallery'>
        <h2 className='productH2'>Gallery:</h2>
        <div className='productGalleryFlex'>
          <img className='productGalleryImage' src={product.img_main} alt='' />
          <img className='productGalleryImage' src={product.img_1} alt='' />
          <img className='productGalleryImage' src={product.img_2} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Product;

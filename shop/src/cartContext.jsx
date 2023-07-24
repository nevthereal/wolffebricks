import { createContext, useEffect, useState } from "react";
import { getProductData, products } from "./productList";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  isInCart: () => {},
  getSubTotal: () => {},
  addMoreToCart: () => {},
});

export function CartProvider({ children }) {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");

  const getMessage = (item, action) => {
    return `${item} was ${action} Cart`;
  };

  const [cartProducts, setCartProducts] = useState(() => {
    const storedCartData = localStorage.getItem("cartProducts");
    return storedCartData ? JSON.parse(storedCartData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  function isInCart(id) {
    return cartProducts.some((product) => product.id === id);
  }

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function addOneToCart(id) {
    setCartProducts([
      ...cartProducts,
      {
        id: id,
        quantity: 1,
      },
    ]);
    setMessage(getMessage(getProductData(id).title, "added to"));
    navigate("/products");
  }

  function addMoreToCart(id) {
    setCartProducts((prevCartProducts) =>
      prevCartProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts((prevCartProducts) =>
        prevCartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id != id;
      })
    );
    setMessage(getMessage(getProductData(id).title, "removed from"));
  }

  function getSubTotal(cartProducts) {
    let subTotal = 0;
    cartProducts.forEach((cartItem) => {
      if (cartItem && cartItem.id) {
        // Add this check
        const productData = getProductData(cartItem.id);
        if (productData) {
          subTotal += productData.price * cartItem.quantity;
        }
      }
    });

    return subTotal;
  }

  useEffect(() => {
    cleanUpCart();
  }, []);

  function cleanUpCart() {
    const updatedCartProducts = cartProducts.filter((cartItem) => {
      const productExists = products.some(
        (product) => product.id === cartItem.id
      );
      return productExists;
    });

    if (updatedCartProducts.length !== cartProducts.length) {
      setCartProducts(updatedCartProducts);
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
    }
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    addMoreToCart,
    removeOneFromCart,
    deleteFromCart,
    getSubTotal: () => getSubTotal(cartProducts),
    isInCart,
    message,
    setMessage,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;

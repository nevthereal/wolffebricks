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

  const contextValue = {
    items: cartProducts,
    addOneToCart,
    removeOneFromCart,
    getSubTotal,
    isInCart,
    message,
    setMessage,
  };

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
    let itemName = getProductData(id).title;

    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
      setMessage(getMessage(itemName, "added to"));
      navigate("/products");
    } else {
      setCartProducts(
        cartProducts.map((product) => {
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product;
        })
      );
    }
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id) {
    let itemName = getProductData(id).title;
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id != id;
      })
    );
    setMessage(getMessage(itemName, "removed from"));
  }

  function getSubTotal() {
    let subTotal = 0;
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id);
      subTotal += productData.price;
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

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;

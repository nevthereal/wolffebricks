import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faWolfPackBattalion } from "@fortawesome/free-brands-svg-icons";

import { CartContext } from "../cartContext";
import Cart from "./Cart";

const Navbar = ({
  handleGoogleSignIn,
  handleSignOut,
  auth,
  handleEmailSignIn,
  handleEmailSignUp,
  userNotFound,
}) => {
  const [cartOpen, setCartOpen] = useState(false);

  const close = () => setCartOpen(false);
  const open = () => setCartOpen(true);
  const cart = useContext(CartContext);

  useEffect(() => {
    if (cartOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [cartOpen]);

  return (
    <div>
      <nav className='flex justify-between mx-4 h-[15vh] md:h-[10vh]'>
        <a
          href='/'
          className='hover:scale-105 duration-200 text-6xl md:text-7xl my-auto'
        >
          <FontAwesomeIcon icon={faWolfPackBattalion} />
        </a>
        <div className='text-lg md:text-xl flex my-auto gap-4'>
          <p className='font-bold hover:scale-105 duration-200'>
            <a href='/products'>Products</a>
          </p>
          <p className='font-bold hover:scale-105 duration-200'>
            <a href='/info'>Info</a>
          </p>
        </div>
        <button
          className='my-aut hover:scale-105 duration-200 text-3xl md:text-4xl'
          onClick={open}
        >
          <div className='flex gap-2 md:gap-3'>
            <FontAwesomeIcon icon={faShoppingCart} />
            {cart.items.length == 0 ? null : (
              <p className='text-base md:text-lg my-auto font-black'>
                {cart.items.length}
              </p>
            )}
          </div>
        </button>
      </nav>
      {cartOpen && (
        <Cart
          cartOpen={cartOpen}
          handleClose={close}
          handleGoogleSignIn={handleGoogleSignIn}
          handleEmailSignIn={handleEmailSignIn}
          handleEmailSignUp={handleEmailSignUp}
          handleSignOut={handleSignOut}
          userNotFound={userNotFound}
          auth={auth}
        />
      )}
    </div>
  );
};

export default Navbar;

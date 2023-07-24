import React from "react";
import Logo from "../assets/wb_logo.png";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

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

  useEffect(() => {
    if (cartOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [cartOpen]);

  return (
    <div>
      <nav className='flex justify-between mx-4 h-[10vh]'>
        <a href='/'>
          <img
            className='my-auto h-[9vh] hover:scale-105 duration-200'
            src={Logo}
            alt='logo'
          />
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
          className='my-auto w-16 md:w-24 hover:scale-105 duration-200 text-3xl md:text-4xl'
          onClick={open}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
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

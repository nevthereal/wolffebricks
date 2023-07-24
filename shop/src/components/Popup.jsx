import React, { useState, useEffect, useContext } from "react";
import { motion, useAnimation } from "framer-motion";
import { CartContext } from "../cartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Popup = ({ children }) => {
  const { message, setMessage } = useContext(CartContext);
  const [isVisible, setIsVisible] = useState(false);

  const animation = useAnimation();

  useEffect(() => {
    if (message !== "") {
      setIsVisible(true);
    }
    if (isVisible) {
      animation.start({
        opacity: 1,
        translateY: 0,
        transition: {
          duration: 1,
          type: "spring",
          bounce: 0.3,
        },
      });
    } else {
      animation.start({
        opacity: 0,
        translateY: "100%",
      });
    }
    const timer = setTimeout(() => {
      setIsVisible(false);
      setMessage("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [isVisible, setMessage, message, animation]);

  const handleClose = () => {
    setIsVisible(false);
    setMessage("");
  };

  return (
    <>
      {children}
      {isVisible ? (
        <motion.div
          animate={animation}
          className='fixed border bg-gray-200 border-gray-300 dark:bg-slate-700 dark:border-slate-600 bottom-0 md:right-0 m-6 p-4 rounded-2xl flex gap-2 shadow-xl shadow-gray-200/75 dark:shadow-slate-700/75 z-20'
        >
          <p className='font-bold text-xl md:text-base'>{message}</p>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={handleClose}
            className='cursor-pointer my-auto'
          />
        </motion.div>
      ) : null}
    </>
  );
};

export default Popup;

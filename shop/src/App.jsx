import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Info from "./pages/Info";
import Product from "./pages/Product";

import { products } from "./productList";
import CartProvider from "./cartContext";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Popup from "./components/Popup";

import { app } from "./firebase";

import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
const handleGoogleSignIn = () => {
  signInWithPopup(auth, googleProvider)
    .then(() => {})
    .catch(() => {});
};

const handleEmailSignUp = (name, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name,
      }).then(() => {});
    })
    .catch((error) => {
      let errorCode = error.code;
      document.getElementById("error-msg").innerText = error.code;
      switch (errorCode) {
        case "auth/email-already-exists":
          document.getElementById("error-msg").innerText =
            "This email is already registred";
          break;
        case "auth/weak-password":
          document.getElementById("error-msg").innerText =
            "This password is too weak. Passwords must have over 6 characters";
          break;
        default:
          document.getElementById("error-msg").innerText =
            "An error occured while trying to sign you in";
          break;
      }
    });
};
const handleEmailSignIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {})
    .catch((error) => {
      let errorCode = error.code;
      switch (errorCode) {
        case "auth/user-not-found":
          document.getElementById("error-msg").innerText = "User not found";
          break;
        case "auth/wrong-password":
          document.getElementById("error-msg").innerText = "Wrong password";
          break;
        case "auth/too-many-requests":
          document.getElementById("error-msg").innerText = "Too many requests";
          break;
        default:
          document.getElementById("error-msg").innerText =
            "An error occured while trying to sign you in";
          break;
      }
    });
};

const handleSignOut = () => {
  signOut(auth)
    .then(() => {})
    .catch(() => {});
};

function App() {
  return (
    <div className='dark:bg-gray-800 dark:text-white'>
      <CartProvider>
        <Navbar
          handleGoogleSignIn={handleGoogleSignIn}
          handleEmailSignIn={handleEmailSignIn}
          handleEmailSignUp={handleEmailSignUp}
          handleSignOut={handleSignOut}
          auth={auth}
        />
        <Popup>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/info' element={<Info />} />
            <Route path='/success' element={<Success auth={auth} />} />
            <Route path='/cancel' element={<Cancel />} />
            {products.map((product, index) => (
              <Route
                key={index}
                path={`/products/${product.link}`}
                element={
                  <Product
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    parts={product.parts}
                    blPrice={product.blPrice}
                    img_main={product.img_main}
                    img_1={product.img_1}
                    img_2={product.img_2}
                    id={product.id}
                    designer={product.designer}
                  />
                }
              />
            ))}
          </Routes>
        </Popup>
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;

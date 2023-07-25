import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Success = ({ auth }) => {
  const [user, loading] = useAuthState(auth);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("id");

    fetch(`${import.meta.env.VITE_CHECKOUT_DOMAIN}/order?orderId=${orderId}`)
      .then((response) => {
        return response.json();
      })
      .then((session) => {
        return setOrderInfo(session);
      })
      .catch((error) =>
        console.error("Error fetching order information:", error)
      );
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          {orderInfo && user ? (
            <>
              <p>
                Thank you for your order, {user.displayName}! You will get a
                mail with the Instructions and Partlists soon!
              </p>
              <div className='my-4'>
                <h1 className='text-2xl font-bold'>Your order details:</h1>
                <ul>
                  <li>
                    Subtotal:{" "}
                    <span className='font-semibold'>
                      {orderInfo.amount_total / 100} CHF
                    </span>
                  </li>
                  <li>
                    Payment status:{" "}
                    <span className='font-semibold'>{orderInfo.status}</span>
                  </li>
                  <li>
                    Order ID:{" "}
                    <span className='font-semibold'>
                      {orderInfo.payment_intent}
                    </span>
                  </li>
                </ul>
                <div className='my-2'>
                  <h1 className='text-lg font-bold'>Customer Details:</h1>
                  <ul className='font-semibold'>
                    <li>
                      <span className='font-normal'>Email:</span>{" "}
                      {orderInfo.customer_details.email}
                    </li>
                    <li>
                      <span className='font-normal'>Name:</span>{" "}
                      {orderInfo.customer_details.name}
                    </li>
                    <li>
                      {orderInfo.customer_details.address.line1}{" "}
                      {orderInfo.customer_details.address.line2}
                    </li>
                    <li>
                      {orderInfo.customer_details.address.postal_code}{" "}
                      {orderInfo.customer_details.address.city},{" "}
                      {orderInfo.customer_details.address.country}
                    </li>
                  </ul>
                </div>
              </div>
              <button className='font-bold border border-gray-400 p-2 rounded-lg py-1 px-2 text-xl hover:scale-105 duration-200'>
                <a href='/' className='font-bold'>
                  Back to home
                </a>
              </button>
            </>
          ) : (
            <p>Loading ...</p>
          )}
        </div>
      )}
    </>
  );
};

export default Success;

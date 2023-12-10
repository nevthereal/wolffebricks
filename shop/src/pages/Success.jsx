import React, { useEffect, useState } from "react";

const Success = () => {
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("id");

    fetch(`${import.meta.env.VITE_SERVER_URL}/order?orderId=${orderId}`)
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
    <div className='mx-6'>
      {orderInfo ? (
        <>
          <p>
            Thank you for your order, {orderInfo.customer_details.name}! You
            will get a mail with the Instructions and Partlists soon!
          </p>
          <div className='my-4'>
            <h1 className='text-4xl font-bold'>Your order:</h1>
            <ul>
              <li>
                <span className='font-semibold'>Status: </span>
                {orderInfo.status}
              </li>
              <li>
                <span className='font-semibold'>Checkout Session ID: </span>
                {orderInfo.id}
              </li>
            </ul>
            <div className='my-2'>
              <h1 className='text-lg font-bold'>Customer Details:</h1>
              <ul>
                <li>
                  <span className='font-bold'>Email:</span>
                  <br />
                  {orderInfo.customer_details.email}
                </li>
                <li>
                  <span className='font-bold'>Address:</span>
                </li>
                <li>{orderInfo.customer_details.address.line1} </li>
                {orderInfo.customer_details.address.line2 && (
                  <li>{orderInfo.customer_details.address.line2}</li>
                )}
                <li>
                  {orderInfo.customer_details.address.postal_code}{" "}
                  {orderInfo.customer_details.address.city}
                </li>
                <li>{orderInfo.customer_details.address.country}</li>
              </ul>
            </div>
            <div className='my-2'>
              <h1 className='text-lg font-bold'>Order Details:</h1>
              <ul>
                {orderInfo.line_items.data.map((item, index) => {
                  return (
                    <li key={index}>
                      <span className='font-bold'>{item.description}</span> -
                      Price: {item.amount_subtotal / item.quantity / 100} CHF,
                      Quantity: {item.quantity}
                    </li>
                  );
                })}
              </ul>
              <div className='mt-4'>
                <p>
                  <span className='font-bold'>Subtotal:</span>
                  <br />
                  {orderInfo.amount_subtotal / 100} CHF
                </p>
                <p>
                  <span className='font-bold'>
                    Total (including coupons & taxes):
                  </span>
                  <br />
                  {orderInfo.amount_total / 100} CHF
                </p>
              </div>
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
  );
};

export default Success;

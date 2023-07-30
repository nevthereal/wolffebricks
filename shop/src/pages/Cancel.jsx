import React from "react";

const Cancel = () => {
  return (
    <div>
      <p className='mb-4'>Your order was cancelled. Sorry to see you go.</p>
      <button className='font-bold border border-gray-400 p-2 rounded-lg py-1 px-2 text-xl hover:scale-105 duration-200'>
        <a href='/' className='font-bold'>
          Back to home
        </a>
      </button>
    </div>
  );
};

export default Cancel;

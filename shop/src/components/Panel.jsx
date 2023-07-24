import React from 'react'

const Panel = ( {link, image, title, price}) => {
  return (
    <div className="border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-700 rounded-2xl w-9/12 md:w-auto p-4 hover:scale-105 duration-200 mx-auto md:mx-0">
            <a href={link}>
            <img className="p-2 w-96 mx-auto rounded-3xl" src={image} alt="at-rt walker" />
            <p className="mb-4 font-bold text-2xl text-center">{title}</p>
            <p className="font-bold">{price} CHF</p>
        </a>
    </div>
  )
}

export default Panel
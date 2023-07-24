import React from 'react'
import Panel from '../components/Panel'
import {products} from '../productList'

const Products = () => {
  return (
    <div>
        <h1 className='text-4xl md:text-6xl font-black uppercase my-16'>Products</h1>
    <div id="products" className="flex justify-center gap-4 flex-wrap my-4 2xl:max-w-[90%] mx-auto">
        {products.map((product, index) =>{
          return(
            <Panel key={index} link={`/products/${product.link}`} image={product.img_main} title={product.title} price={product.price} />
          )
        })}
    </div>
    </div>
  )
}

export default Products
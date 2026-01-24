import React from 'react'
import "./ProductCard.css";
import { useNavigate } from 'react-router-dom';
const ProductCard = ({product}) => {
    const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/product/${product.id}`)} className="productCard w-60 m-3 transition-all cursor-pointer border border-gray-200 rounded-2xl">
        <div className="h-80">
            <img className="h-full w-full object-cover object-top-left rounded-t-lg
 " src={product.imageUrl} alt=''/>
        </div>
        <div className='textPart bg-white p-3 '>
            <div className=''>
                <p className='font-bold py-2 opacity-60 text-center'>{product.brand}</p>
                <p className='text-center opacity-50'>{product.title}</p>
            </div>
            <div className='flex items-center justify-center space-x-2 p-2'>
                <p className='font-semibold'>₹{product.discountedPrice}</p>
                <p className='line-through opacity-50'>₹{product.price}</p>
                <p className='text-green-600 font-semibold'>{product.discountPersent}%Off</p>
            </div>
        </div>
    </div>
  )
}

export default ProductCard
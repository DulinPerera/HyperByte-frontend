import React from 'react'
import emptyImg from '../assets/images.png'
const EmptyCard = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <img src={emptyImg} alt="Empty list img"  />
        <p className='w-1/2 text font-medium text0slate-700 text-center leading-7 mt-5'>No Restaurants Found</p>

    </div>
  )
}

export default EmptyCard
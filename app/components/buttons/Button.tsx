'use client'

import React from 'react'

function Button({id, label, onClick}) {

  // const handleClick = () => {
  //   console.log(label, id);
    
  // }

  return (
    <button className='border-2 text-white border-white px-3 py-2 font-medium duration-200 hover:bg-white hover:text-red-500' onClick={(label) => onClick}>
      {label}
    </button>
  )
}

export default Button

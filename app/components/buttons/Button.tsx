'use client'

import React from 'react'

interface ButtonProps {
  id?: string,
  label?: string,
  onClick?: any, 
}

const Button:React.FC<ButtonProps> = ({
  id, label, onClick
}) => {

  return (
    <button className='border-2 text-white border-white px-3 py-2 font-medium duration-200 hover:bg-white hover:text-red-500' onClick={() => onClick(id, label)}>
      {label}
    </button>
  )
}

export default Button

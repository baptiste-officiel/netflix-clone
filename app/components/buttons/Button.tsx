'use client'

import React from 'react'

interface ButtonProps {
  id?: string,
  label?: string,
  onClick?: any, 
  categoryAction?: boolean
  resetAction?: boolean
}

const Button:React.FC<ButtonProps> = ({
  id, label, onClick, categoryAction, resetAction
}) => {

  return (
    <button className={`border-2 px-3 py-2 font-medium duration-200 ${categoryAction ? 'text-white border-white hover:bg-white hover:text-red-500' : 'bg-white text-black border-black font-semibold'}`} onClick={() => onClick(id, label)}>
      {label}
    </button>
  )
}

export default Button

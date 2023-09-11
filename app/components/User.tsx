'use client'

import { redirect } from "next/navigation"


function User({name}) {

  const handleClick = async(name) => {
    redirect(`/movies/[${name}]`)
  }

  return (
    <div className="bg-white py-4 px-2 flex flex-col justify-center items-center gap-4" onClick={handleClick}>
      <h1 className="text-xl uppercase font-light text-black">{name}</h1>
    </div>
  )
}

export default User

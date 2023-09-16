'use client'

import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
import Image from 'next/image'


function User({name, img}) {

  const router = useRouter();

  const handleClick = async() => {
    router.push(`/browse`)
  }

  return (
    <div className="py-4 px-2 flex flex-col justify-center items-center gap-4 rounded-md cursor-pointer group" onClick={handleClick}>
      {img ? 
        <Image src={img} alt="avatar" width={100} height={100} className="rounded-sm duration-200 group-hover:border" />
        : 
        <Image src={'/img/avatar.png'} alt="avatar" width={100} height={100} className="rounded-sm duration-200 group-hover:border" />
      }
      <h1 className="text-xl capitalize font-light text-neutral-400 group-hover:text-white duration-200">{name}</h1>
    </div>
  )
}

export default User

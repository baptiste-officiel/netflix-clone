'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BiSolidDownArrow } from 'react-icons/bi'


function Navbar() {

  const {data: session} = useSession();

  const [isScroll, setIsScroll] = useState(false)

  
  window.addEventListener('scroll', function(){
    // console.log(window.scrollY);

    if (this.window.scrollY > 135) {
      setIsScroll(true)
    } else {
      setIsScroll(false)
    }
  })

  console.log(isScroll);
  
  
  
  const router = useRouter()

  // const logOut = () => {
  //   // e.preventDefault();

  //   router.push('/')
  // }

  return (
    <div className={`w-full py-2 fixed duration-150 ${!session ? 'bg-white': isScroll ? 'bg-neutral-900' : 'bg-transparent'} z-10`}>
        {!session ? 
        <nav className='flex justify-between items-center max-w-5xl w-full mx-auto py-2 px-4 lg:px-0'>
        <div className='flex justify-between items-center gap-4'>
          <Link href='/'><Image src='/img/logo-red.png' width={50} height={50} alt='logo' className='mr-8' /></Link>
          <ul className={`flex justify-between items-center gap-3 list-none ${isScroll ? 'text-white' : 'text-black'}`}>
          <li className='cursor-pointer'>Home</li>
          <li className='cursor-pointer'>Series</li>
          <li className='cursor-pointer'>Movies</li>
          <li className='cursor-pointer'>My List</li>
          </ul>
        </div>
        <div className='flex items-center gap-4'>
        <Link href='/register' className='hover:text-neutral-600 duration-100 font-medium'>Sign Up</Link>
        <Link href='/login' className='py-2 px-4 border-black border-[2px] rounded-lg bg-black text-white hover:text-black hover:bg-transparent duration-300 font-medium' >Log In</Link>
        </div>
    </nav>
     : 
    <nav className='flex justify-between items-center max-w-5xl w-full mx-auto py-2 px-4 lg:px-0'>
    <div className='flex justify-between items-center gap-4'>
      <Link href='/'><Image src='/img/logo-red.png' width={50} height={50} alt='logo' className='mr-8' /></Link>
      <ul className={`flex justify-between items-center gap-3 list-none ${isScroll ? 'text-white' : 'text-black'}`}>
          <li className='cursor-pointer'>Home</li>
          <li className='cursor-pointer'>Series</li>
          <li className='cursor-pointer'>Movies</li>
          <li className='cursor-pointer'>My List</li>
      </ul>
    </div>
    <div className='flex items-center gap-4'>
    <button className={`py-2 px-4 border-black border-[2px] rounded-lg duration-300 ${isScroll ? 'bg-white' : 'bg-black'} ${isScroll ? 'text-black' : 'text-white'} hover:text-black hover:bg-transparent duration-300 font-medium`} onClick={() => signOut()}>Log Out</button>
    <div className='flex justify-between items-center gap-2 cursor-pointer'>
    {session?.user?.image ? 
        <Image src={session?.user?.image} alt="avatar" width={40} height={40} className='rounded-md' />
        : 
        <Image src={'/img/avatar.png'} alt="avatar" width={40} height={40} className='rounded-md' />
      }
      <Image src={'/img/arrow-down.svg'} alt='arrow-down' width={15} height={20} />
    </div>
    </div>
</nav>
        }
    </div>
  )
}

export default Navbar

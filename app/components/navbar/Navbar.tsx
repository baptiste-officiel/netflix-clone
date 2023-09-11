'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


function Navbar() {

  const {data: session} = useSession();

  const router = useRouter()

  // const logOut = () => {
  //   // e.preventDefault();

  //   router.push('/')
  // }

  return (
    <div className='w-full py-2 border-b-[4px] border-black fixed bg-white'>
        {!session ? 
        <nav className='flex justify-between items-center max-w-5xl w-full mx-auto py-2 px-4 lg:px-0'>
        <Link href='/'><Image src='/img/logo.svg' width={50} height={50} alt='logo' /></Link>
        <div className='flex items-center gap-4'>
        <Link href='/register' className='hover:text-neutral-600 duration-100 font-medium'>Sign Up</Link>
        <Link href='/login' className='py-2 px-4 border-black border-[2px] rounded-lg bg-black text-white hover:text-black hover:bg-transparent duration-300 font-medium' >Log In</Link>
        </div>
    </nav> : 
    <nav className='flex justify-between items-center max-w-5xl w-full mx-auto py-2 px-4 lg:px-0'>
    <Link href='/'><Image src='/img/logo.svg' width={50} height={50} alt='logo' /></Link>
    <div className='flex items-center gap-4'>
    <button className='py-2 px-4 border-black border-[2px] rounded-lg bg-black text-white hover:text-black hover:bg-transparent duration-300 font-medium' onClick={() => signOut()}>Log Out</button>
    </div>
</nav>
        }
    </div>
  )
}

export default Navbar

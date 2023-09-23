'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function NotLoggedNavbar() {
  return (
    <nav className='relative flex justify-between items-center max-w-5xl w-full mx-auto py-2 px-4 lg:px-0'>
    <div className='flex justify-between items-center gap-4'>
      <Link href='/browse'><Image src='/img/logo.png' width={140} height={50} alt='logo' className='mr-8' /></Link>
    </div>
    <div className='flex items-center gap-4'>
    <Link href='/register' className='text-white hover:text-neutral-300 duration-100 font-medium hidden sm:block'>Sign Up</Link>
    <Link href='/login' className='py-2 px-4 border-white border-[2px] rounded-lg bg-black text-white hover:text-black hover:bg-white duration-300 font-medium' >Log In</Link>
    </div>
</nav>
  )
}

export default NotLoggedNavbar

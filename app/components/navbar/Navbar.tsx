import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Navbar() {
  return (
    <div className='w-full py-2 border-b-[4px] border-black'>
        <nav className='flex justify-between items-center max-w-5xl w-full mx-auto py-2'>
            <Link href='/'><Image src='/img/logo.svg' width={50} height={50} alt='logo' /></Link>
            <div className='flex items-center gap-4'>
            <Link href='/login' >Log In</Link>
            <Link href='/signup'>Sign Up</Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar

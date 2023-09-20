'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BiHomeAlt, BiDownload } from 'react-icons/bi'
import { MdOutlineLocalMovies } from 'react-icons/md'
import { RiMovieLine } from 'react-icons/ri'


const Navbar = () => {

  const {data: session} = useSession();

  const [isScroll, setIsScroll] = useState(false)

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    if (!openMenu) {
      setOpenMenu(true)
    } else {
      setOpenMenu(false)
    }
  }
  
  // use this to avoid error on server 
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', function(){
    // console.log(window.scrollY);

    if (window.scrollY > 35) {
      setIsScroll(true)
    } else {
      setIsScroll(false)
    }
  }) 
}

  console.log(isScroll);
  
  
  
  const router = useRouter()

  // const logOut = () => {
  //   // e.preventDefault();

  //   router.push('/')
  // }

  return (
    <div className={`w-full py-2 fixed duration-150 ${!session ? 'bg-black': isScroll ? 'bg-black' : 'bg-transparent'} z-10`}>
        {!session ? (
        <nav className='relative flex justify-between items-center max-w-5xl w-full mx-auto py-2 px-4 lg:px-0'>
        <div className='flex justify-between items-center gap-4'>
          <Link href='/browse'><Image src='/img/logo.png' width={140} height={50} alt='logo' className='mr-8' /></Link>
        </div>
        <div className='flex items-center gap-4'>
        <Link href='/register' className='text-white hover:text-neutral-300 duration-100 font-medium hidden sm:block'>Sign Up</Link>
        <Link href='/login' className='py-2 px-4 border-white border-[2px] rounded-lg bg-black text-white hover:text-black hover:bg-white duration-300 font-medium' >Log In</Link>
        </div>
    </nav>
         ) : ( 
    <nav className='relative flex justify-between items-center max-w-5xl w-full mx-auto py-2 px-4 lg:px-0'>
    <div className='flex justify-between items-center gap-4'>
      <Link href='/browse'><Image src='/img/logo.png' width={140} height={50} alt='logo' className='mr-8' /></Link>
      <ul className={`flex fixed bottom-0 left-0 p-4 text-white bg-neutral-900 w-full justify-between items-center gap-3 list-none ${isScroll ? 'sm:text-white' : 'sm:text-black'} sm:relative sm:bg-transparent`}>
          <li className=' text-sm font-light cursor-pointer w-[25%] text-center border-r sm:w-auto sm:border-none sm:font-medium sm:text-base'><Link href={'/'} className='flex flex-col justify-between items-center'><span className='sm:hidden'><BiHomeAlt size={25} /></span>Home</Link></li>
          <li className='text-sm font-light cursor-pointer w-[25%] text-center border-r sm:w-auto sm:border-none sm:font-medium sm:text-base'><Link href={'/categories'} className='flex flex-col justify-between items-center'><span className='sm:hidden'><MdOutlineLocalMovies size={25} /></span>Categories</Link></li>
          <li className='text-sm font-light cursor-pointer w-[25%] text-center border-r sm:w-auto sm:border-none sm:font-medium sm:text-base'><Link href={'/'} className='flex flex-col justify-between items-center'><span className='sm:hidden'><RiMovieLine size={25} /></span>Series</Link></li>
          <li className='text-sm font-light cursor-pointer w-[25%] text-center sm:w-auto sm:font-medium sm:text-base'><Link href={'/'} className='flex flex-col justify-between items-center'><span className='sm:hidden'><BiDownload size={25} /></span>My List</Link></li>
      </ul>
    </div>
    <div className='flex flex-col items-center gap-4'>
    <div className='flex justify-between items-center gap-2 cursor-pointer' onClick={toggleMenu}>
    {session?.user?.image ? 
        <Image src={session?.user?.image} alt="avatar" width={40} height={40} className='rounded-md' />
        : 
        <Image src={'/img/avatar.png'} alt="avatar" width={40} height={40} className='rounded-md' />
      }
      <Image src={'/img/arrow-down.svg'} alt='arrow-down' width={15} height={20} />
    </div>

      <div className={`absolute top-[75px] right-0 flex-col gap-2 bg-neutral-900 p-4 rounded-md ${openMenu ? 'flex' : 'hidden'}`} onClick={toggleMenu}>
      <Link href='/users' className='flex justify-between items-center pr-2 text-white gap-4'>
      {session?.user?.image ? 
        <Image src={session?.user?.image} alt="avatar" width={20} height={20} className='rounded-md' />
        : 
        <Image src={'/img/avatar.png'} alt="avatar" width={20} height={20} className='rounded-md' />
      }{session?.user?.name}
      </Link>
      <button className={`py-2 px-4 mt-4 border-white border-[2px] rounded-lg duration-300 ${isScroll ? 'bg-white' : 'bg-black'} ${isScroll ? 'text-black' : 'text-white'} hover:bg-white hover:text-black duration-300 font-medium`} onClick={() => signOut()}>Log Out</button>
      </div>
    </div>
</nav>
        )}
    </div>
  )
}

export default Navbar

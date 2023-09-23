'use client'

import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { BiHomeAlt, BiDownload } from 'react-icons/bi'
import { MdOutlineLocalMovies } from 'react-icons/md'
import { RiMovieLine } from 'react-icons/ri'

interface NavProps {
    image?: any,
    name?: any,
    isScroll?: boolean,
    openMenu?: boolean,
    onClick?: any
}

const LoggedNavbar:React.FC<NavProps> = ({
    image, name, isScroll, openMenu, onClick
}) => {
  return (
    <nav className='relative flex justify-between items-center max-w-5xl w-full mx-auto py-2 px-4 lg:px-0'>
    <div className='flex justify-between items-center gap-4'>
      <Link href='/browse'><Image src='/img/logo.png' width={140} height={50} alt='logo' className='mr-8' /></Link>
      <ul className={`flex fixed bottom-0 left-0 p-4 text-white bg-neutral-900 w-full justify-between items-center gap-3 list-none ${isScroll ? 'sm:text-white' : 'sm:text-black'} sm:relative sm:bg-transparent`}>
          <li className=' text-sm font-light cursor-pointer w-[25%] text-center border-r sm:w-auto sm:border-none sm:font-medium sm:text-base'><Link href={'/browse'} className='flex flex-col justify-between items-center'><span className='sm:hidden'><BiHomeAlt size={25} /></span>Home</Link></li>
          <li className='text-sm font-light cursor-pointer w-[25%] text-center border-r sm:w-auto sm:border-none sm:font-medium sm:text-base'><Link href={'/categories'} className='flex flex-col justify-between items-center'><span className='sm:hidden'><MdOutlineLocalMovies size={25} /></span>Categories</Link></li>
          <li className='text-sm font-light cursor-pointer w-[25%] text-center border-r sm:w-auto sm:border-none sm:font-medium sm:text-base'><Link href={'/series'} className='flex flex-col justify-between items-center'><span className='sm:hidden'><RiMovieLine size={25} /></span>Series</Link></li>
          <li className='text-sm font-light cursor-pointer w-[25%] text-center sm:w-auto sm:font-medium sm:text-base'><Link href={'/'} className='flex flex-col justify-between items-center'><span className='sm:hidden'><BiDownload size={25} /></span>My List</Link></li>
      </ul>
    </div>
    <div className='flex flex-col items-center gap-4'>
    <div className='flex justify-between items-center gap-2 cursor-pointer' onClick={onClick}>
    {image ? 
        <Image src={image} alt="avatar" width={40} height={40} className='rounded-md' />
        : 
        <Image src={'/img/avatar.png'} alt="avatar" width={40} height={40} className='rounded-md' />
      }
      <Image src={'/img/arrow-down.svg'} alt='arrow-down' width={15} height={20} />
    </div>

      <div className={`absolute top-[75px] right-0 flex-col gap-2 bg-neutral-900 p-4 rounded-md ${openMenu ? 'flex' : 'hidden'}`} onClick={onClick}>
      <Link href='/users' className='flex justify-between items-center pr-2 text-white gap-4'>
      {image ? 
        <Image src={image} alt="avatar" width={20} height={20} className='rounded-md' />
        : 
        <Image src={'/img/avatar.png'} alt="avatar" width={20} height={20} className='rounded-md' />
      }{name}
      </Link>
      <button className={`py-2 px-4 mt-4 border-white border-[2px] rounded-lg duration-300 ${isScroll ? 'bg-white' : 'bg-black'} ${isScroll ? 'text-black' : 'text-white'} hover:bg-white hover:text-black duration-300 font-medium`} onClick={() => signOut()}>Log Out</button>
      </div>
    </div>
</nav>
  )
}

export default LoggedNavbar

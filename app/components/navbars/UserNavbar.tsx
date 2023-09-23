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


const UserNavbar = () => {

  return (
      <nav className='relative flex justify-between items-center max-w-5xl w-full mx-auto py-2 px-4 lg:px-0'>
            <Link href='/users'><Image src='/img/logo.png' width={140} height={50} alt='logo' className='mr-8' /></Link>
            <button className={`py-2 px-4 border-white border-[2px] rounded-lg duration-300 text-white hover:bg-white hover:text-black font-medium`} onClick={() => signOut()}>Log Out</button>
      </nav>
  )
}

export default UserNavbar

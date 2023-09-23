'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { signOut, useSession } from 'next-auth/react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import NotLoggedNavbar from '../navbars/NotLoggedNavbar'
import LoggedNavbar from '../navbars/LoggedNavbar'
import UserNavbar from '../navbars/UserNavbar'


const Navbar = () => {

  const {data: session} = useSession();

  const [isScroll, setIsScroll] = useState(false)
  const [openMenu, setOpenMenu] = useState(false);

  const pathname = usePathname()
  console.log("🚀 ~ file: Navbar.tsx:23 ~ Navbar ~ params:", pathname)

  // Toggle the value for session menu 
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
  const router = useRouter()

  return (
    <div className={`w-full py-2 fixed duration-150 ${!session ? 'bg-black': isScroll ? 'bg-black' : 'bg-transparent'} z-50`}>
        {!session ? (
          <NotLoggedNavbar />
        ) : session && pathname==='/users' ? ( 
          <UserNavbar />
        ) : 
           <LoggedNavbar image={session?.user?.image} name={session?.user?.name} isScroll={isScroll} openMenu={openMenu} onClick={toggleMenu} />
        }
    </div>
  )
}

export default Navbar

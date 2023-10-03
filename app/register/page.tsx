'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


function Signup() {

  const {data: session} = useSession();
  console.log("🚀 ~ file: page.tsx:15 ~ Login ~ data:", session)

  if (session) {
    redirect('/users')
  } 

  const router = useRouter()

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(data)
      }) 
      const userInfo = await res.json()
      console.log("🚀 ~ file: page.tsx:32 ~ handleSubmit ~ userInfo:", userInfo)
      router.push('/login')
      toast.success('User created')
    } catch (error) {
      console.log(error);
    }  
  }

  return (
    <>
    <div className='bg-black sm:bg-hero min-h-screen bg-cover bg-center pt-28'>
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto rounded-xl bg-black w-full sm:w-4/5 md:w-3/5 lg:w-2/5">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-white">
          Sign up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-neutral-200">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
                value={data.name}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, name: e.currentTarget.value})}
                />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-neutral-200">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
                value={data.email}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, email: e.currentTarget.value})}
                />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-neutral-200">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
                value={data.password}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, password: e.currentTarget.value})}
                />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-2 mt-12 text-sm font-semibold leading-6 text-white shadow-sm duration-200 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
      <p className='text-center text-sm text-neutral-300 font-light mt-8'>Already have an account ? <Link href='/login' className='underline font-medium text-neutral-200'>Log in !</Link></p>

    </div>
    </div>
  </>
  )
}

export default Signup

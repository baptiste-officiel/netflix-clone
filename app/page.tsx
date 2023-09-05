import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='text-center'><h1 className='text-2xl font-semibold'>Page</h1>
          <div className='flex justify-center items-center gap-4'>
          {/* <Link href='/login' >Log In</Link>
          <Link href='/signup'>Sign Up</Link> */}
          </div>

    </div>
  )
}

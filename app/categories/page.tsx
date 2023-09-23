import React from 'react'
import Genres from '../components/genres/Genres'

function page() {
  return (
    <div className='pt-28 w-full min-h-screen bg-black text-white px-2'>
      <div className='max-w-6xl mx-auto flex flex-col'>
      <div>
      <h2 className='text-3xl font-semibold py-2'>Categories</h2>
      </div>
      <Genres />
      </div>
    </div>
  )
}

export default page

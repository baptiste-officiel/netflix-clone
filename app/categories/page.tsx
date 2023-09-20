import React from 'react'
import MoviesByGenre from '../components/movies/MoviesByGenre'

function page() {
  return (
    <div className='pt-28 max-w-6xl mx-auto'>
      Categories
      <MoviesByGenre />
    </div>
  )
}

export default page

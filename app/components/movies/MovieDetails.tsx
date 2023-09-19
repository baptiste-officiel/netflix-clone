'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import SimilarMovies from './SimilarMovies'


const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] })


const url = 'https://api.themoviedb.org/3/movie';
const api_key = '698bd3478bb74b5fd60f2f3e36bfdc60'

function MovieDetails() {

  const params = useParams()
  console.log("🚀 ~ file: MovieDetails.tsx:8 ~ MovieDetails ~ params:", params)

  const [movie, setMovie] = useState<{[key: string]: any}>({})

  const getMovieDetails = async() => {
    const res = await fetch(`${url}/${params.id}?api_key=${api_key}&language=en-US`)
    const data = await res.json()
    console.log("🚀 ~ file: MovieDetails.tsx:16 ~ getMovieDetails ~ data:", data)

    setMovie(data)
  }

  useEffect(() => {
    getMovieDetails()
  }, [])
  

  return (
    <div className='bg-neutral-900 min-h-screen'>
        <div className="bg-gradient-to-t from-neutral-900 h-[250px] w-full absolute z-0"></div>
      {movie.backdrop_path && 
              <Image src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title && movie.title || !movie.title ? movie.original_title : movie.original_title || 'movie'} width={1000} height={300} className="min-w-full h-[250px] max-h-screen object-cover object-center" />
      }
    <div className={`relative w-full max-w-5xl mx-auto ${!movie.backdrop_path ? 'pt-[200px]' : '-mt-[50px]'} flex gap-8 px-2`}>
      {movie.poster_path && 
            <Image src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title && movie.title || !movie.title ? movie.original_title : movie.original_title || 'movie'} width={200} height={200} className="h-[300px] w-[200px] object-cover object-center rounded-sm hidden sm:block" />
      }
      <div className={`flex flex-col justify-between`}>
        <p className={`text-4xl ${movie.vote_average && movie.vote_average > 4 ? movie.vote_average <= 6.5 ? 'text-orange-500' : 'text-green-500' : 'text-red-500'} order-1 sm:order-1`}>{movie.vote_average && (movie.vote_average).toFixed(1)}<span className='text-lg'> /10</span></p>
        <p className='text-neutral-400 font-light italic text-sm order-4 pb-2 sm:order-2'>{movie.release_date && (movie.release_date).slice(0, 4)} - {movie.runtime}mn - <Link href={`${movie.homepage}`} target='_blank' className='underline'>{movie.homepage}</Link>
</p>
        <h2 className={`${poppins.className} text-6xl text-neutral-100 pt-4 font-semibold order-2 sm:order-3`}>{movie.title}</h2>
        <h3 className={`${poppins.className} text-neutral-200 text-2xl font-medium order-3 sm:order-4`}>{movie.tagline}</h3>
        <p className='text-neutral-400 order-5 sm:order-5'>{movie.overview}</p>
        <Link href={`/browse`} className='flex items-center gap-2 text-neutral-200 mt-4 order-6 sm:order-6'><AiOutlinePlusCircle size={30} style={{color: 'white'}} />Add to list</Link>
      </div>

    </div>
    <SimilarMovies />
    </div>
  )
}

export default MovieDetails

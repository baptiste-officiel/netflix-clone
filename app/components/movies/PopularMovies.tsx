'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AiOutlinePlusCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import Link from 'next/link'


const url = 'https://api.themoviedb.org/3';
const api_key = '698bd3478bb74b5fd60f2f3e36bfdc60'

export default function PopularMovies() {

  const [popularMovies, setPopularMovies] = useState<any[]>([])
  const [topMovie, setTopMovie] = useState<{[key: string]: any}>({})

    const getMovies = async() => {
        const res = await fetch(`${url}/movie/popular?api_key=${api_key}&language=en-US&page=1`)
        const data = await res.json()
        // console.log("🚀 ~ file: Movies.tsx:12 ~ getMovies ~ data:", data)

        setPopularMovies(data.results.slice(1, 20))
        setTopMovie(data.results[0])
    }

    useEffect(() => {
      getMovies()
    }, [])

    console.log(topMovie);

   
    // setDate(topMovie.release_date.slice(0, 4))
    
    // console.log(date);
    
    // releaseDate 
    

  return (
    <div>
      {topMovie && 
        <div className="relative">
          <div className="bg-gradient-to-t from-neutral-900 min-h-screen w-full absolute z-0"></div>
          <Image src={`https://image.tmdb.org/t/p/original${topMovie.backdrop_path}`} alt={topMovie.title} width={1400} height={1000} className="min-w-full min-h-screen max-h-screen object-cover object-center" />
          <div className="absolute top-[65%] w-full sm:left-4 sm:max-w-lg sm:top-[50%] md:top-[40%]">
          <h4 className="text-7xl text-neutral-200 text-center uppercase sm:text-left sm:font-bold">{topMovie.title}</h4>
          <div className="items-center gap-4 mt-2 ml-2 hidden sm:flex">
          <p className="text-green-400 text-md">{topMovie.vote_average}/10</p>
          <p className="text-neutral-400 text-md">{topMovie.release_date && topMovie.release_date.slice(0, 4)}</p>
          </div>
          <p className="mt-2 text-neutral-300 ml-2 hidden sm:block">{topMovie.overview}</p>
          <div className="mt-2 flex justify-center items-center sm:justify-start gap-2">
          <Link href={`/movie/${topMovie.id}`}><AiOutlineInfoCircle size={30} style={{color: 'white'}} /></Link>
          <Link href={`/browse`}><AiOutlinePlusCircle size={30} style={{color: 'white'}} /></Link>
          </div>
          </div>
        </div>
      }
      <div className="relative -mt-20 z-2">
      <h2 className="text-xl text-white font-bold pb-4 p-2 sm:text-2xl">Popular movies on Netflix Clone</h2>
      <div className="bg-gradient-to-t from-black px-2">
      <Splide
      options={{
        perPage:7,
        pagination: false,
        drag: 'free',
        gap: '0.4rem',
        breakpoints: {
          450: {
            perPage: 2
          },
          640: {
            perPage: 3,
          },
          748: {
            perPage: 4,
          },
          1024: {
            perPage: 5
          },
          1280: {
            perPage: 6
          },
        }
      }}>
      {popularMovies && 
        popularMovies.map((item) =>
          <SplideSlide key={item.id}>
            <div key={item.id} className="group relative">
            <Image src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title} width={250} height={300} className="rounded-sm" />
            <div className="bg-neutral-900 w-full h-full absolute top-0 opacity-0 group-hover:opacity-80 duration-300 z-20"></div>
            <Link href={`/movie/${item.id}`} className="opacity-0 absolute z-20 group-hover:opacity-100 top-2 right-2 duration-300"><AiOutlineInfoCircle size={30} style={{color: 'red'}} /></Link>
          </div>
          </SplideSlide>
        )
      }
      </Splide>
      </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'
// @ts-ignore 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AiOutlinePlusCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import Link from 'next/link'


const url = 'https://api.themoviedb.org/3';

export default function PopularMovies() {

  const [popularMovies, setPopularMovies] = useState<any[]>([])
  const [topMovie, setTopMovie] = useState<{[key: string]: any}>({})

  // get Popular movies frome the moviedb, add one in topMovie ans others in popularMovies 
    const getMovies = async() => {
        const res = await fetch(`${url}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`)
        const data = await res.json()

        setPopularMovies(data.results.slice(1, 20))
        setTopMovie(data.results[0])
    }

    useEffect(() => {
      getMovies()
    }, [])

    console.log(topMovie.backdrop_path);
    

  return (
    <div>
      {/* TopMovie at the top of the app  */}
      {topMovie && 
        <div className="relative">
          <div className="bg-gradient-to-t from-neutral-900 min-h-screen w-full absolute z-0 border-none"></div>
            <Image src={`https://image.tmdb.org/t/p/original${topMovie.backdrop_path}`} alt={topMovie.title && topMovie.title || !topMovie.title ? topMovie.original_title : topMovie.original_title || 'Serie'} width={1400} height={1000} unoptimized className="min-w-full min-h-screen max-h-screen object-cover object-center hidden sm:block" />  
            <Image src={`https://image.tmdb.org/t/p/original${topMovie.poster_path}`} alt={topMovie.title && topMovie.title || !topMovie.title ? topMovie.original_title : topMovie.original_title || 'Serie'} width={1400} height={1000} unoptimized className="min-w-full min-h-screen max-h-screen object-cover object-center sm:hidden" />
          <div className="absolute top-[65%] w-full sm:left-4 sm:max-w-[100%] sm:top-[50%] md:top-[40%] md:max-w-2xl lg:max-w-[60%]">
          <h4 className="text-3xl font-medium break-words text-neutral-200 text-center uppercase sm:text-left sm:font-bold sm:text-5xl md:text-7xl order-1">{topMovie.title}</h4>
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

      {/* First slider of popular movies  */}
      <div className="relative -mt-20">
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
        item.poster_path &&
          <SplideSlide key={item.id}>
            <Link href={`/movie/${item.id}`} className=" ">
            <div className="group relative">
              <div className="rounded-sm max-h-[450px] w-full overflow-hidden">
              <Image src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title && item.title || !item.title ? item.original_title : item.original_title || 'movie'} width={250} height={450} className="rounded-sm w-full h-full scale-100 transition duration-500 group-hover:scale-125" />
              </div>
            <div className="bg-neutral-900 w-full h-full absolute top-0 opacity-0 group-hover:opacity-80 duration-300 z-10"></div>
            <div className="absolute top-2 right-2 z-10 duration-300 opacity-0 group-hover:opacity-100"><AiOutlineInfoCircle size={30} style={{color: 'white'}} /></div>
          </div>
          </Link>
          </SplideSlide>
        )
      }
      </Splide>
      </div>
      </div>
    </div>
  )
}

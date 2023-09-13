'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const url = 'https://api.themoviedb.org/3';
const api_key = '698bd3478bb74b5fd60f2f3e36bfdc60'

export default function PopularMovies() {

  const [popularMovies, setPopularMovies] = useState<any[]>([])
  const [topMovie, setTopMovie] = useState<{[key: string]: any}>({})
  const [date, setDate] = useState('')

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
          <div className="bg-gradient-to-tr from-neutral-900 min-h-screen w-full absolute z-0"></div>
          <Image src={`https://image.tmdb.org/t/p/original${topMovie.backdrop_path}`} alt={topMovie.title} width={1200} height={100} className="min-w-full max-h-screen object-cover object-center" />
          <div className="absolute top-[40%] left-4 max-w-lg">
          <h4 className="text-7xl font-bold text-neutral-200">{topMovie.title}</h4>
          <div className="flex items-center gap-4 mt-2 ml-2">
          <p className="text-green-400 text-md">{topMovie.vote_average}/10</p>
          <p className="text-neutral-400 text-md">{topMovie.release_date && topMovie.release_date.slice(0, 4)}</p>
          </div>
          <p className="mt-2 text-neutral-300 ml-2">{topMovie.overview}</p>
          </div>
        </div>
      }
      <div className="relative -mt-20 z-2">
      <h2 className="text-2xl text-white font-bold pb-4 p-2">Popular movies on Netflix Clone</h2>
      <div className="bg-black px-2">
      <Splide
      options={{
        perPage:7,
        pagination: false,
        drag: 'free',
        gap: '0.2rem',
      }}>
      {popularMovies && 
        popularMovies.map((item) =>
          <SplideSlide key={item.id}>
            <div key={item.id} className="">
            <Image src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title} width={200} height={100} className="" />
            {/* <h1>{item.title}</h1> */}
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

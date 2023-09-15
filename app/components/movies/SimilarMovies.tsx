'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Link from 'next/link'
import { AiOutlineInfoCircle } from 'react-icons/ai'


const url = 'https://api.themoviedb.org/3/movie';
const api_key = '698bd3478bb74b5fd60f2f3e36bfdc60'

function SimilarMovies() {

    const params = useParams()
    console.log("🚀 ~ file: MovieDetails.tsx:8 ~ MovieDetails ~ params:", params)
  
    const [similarMovies, setSimilarMovies] = useState<any[]>([])
  
    const getSimilarMovies = async() => {
      const res = await fetch(`${url}/${params.id}/similar?api_key=${api_key}&language=en-US`)
      const data = await res.json()
      console.log("🚀 ~ file: MovieDetails.tsx:16 ~ getSimilarMovies ~ data:", data)
  
      setSimilarMovies(data.results);
    }
  
    useEffect(() => {
      getSimilarMovies()
    }, []);

  return (
    <div className='mt-20 pb-4 px-2'>
      <h4 className='text-xl text-white font-bold pb-4 p-2 sm:text-2xl'>Similar</h4>
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
      {similarMovies && 
        similarMovies.map((item) => 
            item.poster_path && 
            <SplideSlide key={item.id}>
                <div key={item.id} className="group relative">
            <Image src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title} width={250} height={300} className="rounded-sm max-h-[300px]" />
            <div className="bg-neutral-900 w-full h-full absolute top-0 opacity-0 group-hover:opacity-80 duration-300 z-20"></div>
            <Link href={`/movie/${item.id}`} className="opacity-0 absolute z-20 group-hover:opacity-100 top-2 right-2 duration-300"><AiOutlineInfoCircle size={30} style={{color: 'white'}} /></Link>
          </div>
            </SplideSlide>
      )}
        </Splide>

    </div>
  )
}

export default SimilarMovies

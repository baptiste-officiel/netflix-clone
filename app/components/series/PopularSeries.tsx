'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'
// @ts-ignore 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AiOutlinePlusCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import Link from 'next/link'


const url = 'https://api.themoviedb.org/3';

export default function PopularSeries() {

  const [popularSeries, setPopularSeries] = useState<any[]>([])
  const [topSerie, setTopSerie] = useState<{[key: string]: any}>({})

  // get Popular Series frome the Seriedb, add one in topSerie ans others in popularSeries 
    const getSeries = async() => {
        const res = await fetch(`${url}/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`)
        const data = await res.json()

        setPopularSeries(data.results.slice(1, 20))
        setTopSerie(data.results[0])
    }

    useEffect(() => {
      getSeries()
    }, [])

    console.log(topSerie);
    

  return (
    <div>
      {/* TopSerie at the top of the app  */}
      {topSerie && 
        <div className="relative">
          <div className="bg-gradient-to-t from-neutral-900 min-h-screen w-full absolute z-0"></div>
          <Image src={`https://image.tmdb.org/t/p/original${topSerie.backdrop_path}`} alt={topSerie.title && topSerie.title || !topSerie.title ? topSerie.original_title : topSerie.original_title || 'Serie'} width={1400} height={1000} className="min-w-full min-h-screen max-h-screen object-cover object-center" />
          {/* <Image src={`https://image.tmdb.org/t/p/original${topSerie.poster_path}`} alt={topSerie.title && topSerie.title || !topSerie.title ? topSerie.original_title : topSerie.original_title || 'Serie'} width={1400} height={1000} className="opacity-100 min-w-full min-h-screen max-h-screen object-cover object-center sm:opacity-0" /> */}
          <div className="absolute top-[65%] w-full sm:left-4 sm:max-w-lg sm:top-[50%] md:top-[40%]">
          <h4 className="text-7xl text-neutral-200 text-center uppercase sm:text-left sm:font-bold order-1">{topSerie.name}</h4>
          <div className="items-center gap-4 mt-2 ml-2 hidden sm:flex">
          <p className="text-green-400 text-md">{topSerie.vote_average}/10</p>
          <p className="text-neutral-400 text-md">{topSerie.first_air_date && topSerie.first_air_date.slice(0, 4)}</p>
          </div>
          <p className="mt-2 text-neutral-300 ml-2 hidden sm:block">{topSerie.overview}</p>
          <div className="mt-2 flex justify-center items-center sm:justify-start gap-2">
          <Link href={`/serie/${topSerie.id}`}><AiOutlineInfoCircle size={30} style={{color: 'white'}} /></Link>
          <Link href={`/browse`}><AiOutlinePlusCircle size={30} style={{color: 'white'}} /></Link>
          </div>
          </div>
        </div>
      }

      {/* First slider of popular Series  */}
      <div className="relative -mt-20 z-2">
      <h2 className="text-xl text-white font-bold pb-4 p-2 sm:text-2xl">Popular Series on Netflix Clone</h2>
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
      {popularSeries && 
        popularSeries.map((item) =>
          <SplideSlide key={item.id}>
            <Link href={`/serie/${item.id}`} className=" ">
            <div className="group relative">
              <div className="rounded-sm max-h-[300px] w-full overflow-hidden">
              <Image src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title && item.title || !item.title ? item.original_title : item.original_title || 'Serie'} width={250} height={300} className="rounded-sm w-full h-full scale-100 transition duration-500 group-hover:scale-125" />
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

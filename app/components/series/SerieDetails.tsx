'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import SimilarSeries from './SimilarSeries'


const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] })


const url = 'https://api.themoviedb.org/3/tv';

function SerieDetails() {

  const params = useParams()
  console.log("🚀 ~ file: SerieDetails.tsx:8 ~ SerieDetails ~ params:", params)

  const [serie, setSerie] = useState<{[key: string]: any}>({})
  
  const getSerieDetails = async() => {
    const res = await fetch(`${url}/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`)
    const data = await res.json()
    // console.log("🚀 ~ file: SerieDetails.tsx:16 ~ getSerieDetails ~ data:", data)

    setSerie(data)
  }

  useEffect(() => {
    getSerieDetails()
  }, [])
  
    console.log("🚀 ~ file: SerieDetails.tsx:24 ~ SerieDetails ~ serie:", serie)

  return (
    <div className='bg-neutral-900 min-h-screen'>
        <div className="bg-gradient-to-t from-neutral-900 h-[350px] w-full absolute z-0"></div>
      {serie.backdrop_path && 
              <Image src={`https://image.tmdb.org/t/p/original${serie.backdrop_path}`} alt={serie.name && serie.name || !serie.name ? serie.original_name : serie.original_name || 'Serie'} width={1000} height={400} className="min-w-full h-[350px] max-h-screen object-cover object-center" />
      }
    <div className={`relative w-full max-w-5xl mx-auto ${!serie.backdrop_path ? 'pt-[200px]' : '-mt-[50px]'} flex gap-8 px-2`}>
      {serie.poster_path && 
            <Image src={`https://image.tmdb.org/t/p/original${serie.poster_path}`} alt={serie.name && serie.name || !serie.name ? serie.original_name : serie.original_name || 'Serie'} width={200} height={200} className="h-[300px] w-[200px] object-cover object-center rounded-sm hidden sm:block" />
      }
      <div className={`flex flex-col justify-between`}>
        <p className={`text-4xl ${serie.vote_average && serie.vote_average > 4 ? serie.vote_average <= 6.5 ? 'text-orange-500' : 'text-green-500' : 'text-red-500'} order-1 sm:order-1`}>{serie.vote_average && (serie.vote_average).toFixed(1)}<span className='text-lg'> /10</span></p>
        <p className='text-neutral-400 font-light italic text-sm order-4 pb-2 sm:order-2'>{serie.first_air_date && (serie.first_air_date).slice(0, 4)} to {serie.last_air_date && (serie.last_air_date).slice(0, 4)} - {serie.number_of_seasons} seasons | {serie.number_of_episodes} episodes - <Link href={`${serie.homepage}`} target='_blank' className='underline'>{serie.homepage}</Link>
</p>
        <h2 className={`${poppins.className} text-6xl text-neutral-100 pt-4 font-semibold order-2 sm:order-3`}>{serie.name}</h2>
        <h3 className={`${poppins.className} text-neutral-200 text-2xl font-medium order-3 sm:order-4`}>{serie.tagline}</h3>
        <p className='text-neutral-400 order-5 sm:order-5'>{serie.overview}</p>
        <Link href={`/browse`} className='flex items-center gap-2 text-neutral-200 mt-4 order-6 sm:order-6'><AiOutlinePlusCircle size={30} style={{color: 'white'}} />Add to list</Link>
      </div>

    </div>
    <SimilarSeries />
    </div>
  )
}

export default SerieDetails

'use client'

import { useEffect, useRef, useState } from "react"
import Image from 'next/image'
// @ts-ignore 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AiOutlinePlusCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import Link from 'next/link'

import React from 'react'

const url = 'https://api.themoviedb.org/3';

function DiscoverSeries() {

    const [isLoading, setIsLoading] = useState(false)
    const [discoverSeries, setDiscoverSeries] = useState<any[]>([])
    const bottom = React.useRef<HTMLDivElement | null>(null)
    let page = 2;
  
      const getSeries = async() => {
        setIsLoading(true)
          const res = await fetch(`${url}/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`)
          const data = await res.json()
          // console.log("🚀 ~ file: Series.tsx:12 ~ getSeries ~ data:", data)
  
          // setDataArray(data)
          setDiscoverSeries((prevData) => [...prevData, data.results])
          // setDiscoverSeries(data.results)
          page++;
          setIsLoading(false)
      }

      useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            getSeries();
            console.log(entries);
          }
        });
        observer.observe(bottom.current as Element);
      }, []);
  
    // console.log("🚀 ~ file: DiscoverSeries.tsx:18 ~ DiscoverSeries ~ dataArray:", discoverSeries);
      

  return (
    <>
    {discoverSeries && 
      discoverSeries.map((items, index) => 
      <div className="relative mt-8 bg-black" key={index}>
      <h2 className="text-xl text-white font-bold pb-4 p-2 sm:text-2xl">Discover on Netflix Clone</h2>
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
      {items.map((item: any) =>
      <SplideSlide key={item.id}>
            <Link href={`/serie/${item.id}`}>
            <div className="group relative">
              <div className="rounded-sm max-h-[300px] w-full overflow-hidden">
              <Image src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title && item.title || !item.title ? item.original_title : item.original_title || 'movie'} width={250} height={300} className="rounded-sm w-full h-full scale-100 transition duration-500 group-hover:scale-125" />
              </div>
            <div className="bg-neutral-900 w-full h-full absolute top-0 opacity-0 group-hover:opacity-80 duration-300 z-10"></div>
            <div className="absolute top-2 right-2 z-10 duration-300 opacity-0 group-hover:opacity-100"><AiOutlineInfoCircle size={30} style={{color: 'white'}} /></div>
          </div>
          </Link>
          </SplideSlide>
      )}
      </Splide>
      </div>
      </div>
      )
    }
    <div ref={bottom} />
    <div className={`${isLoading ? 'block' : 'hidden'} fixed bottom-0 flex justify-center items-center bg-gradient-to-t from-neutral-950 h-[200px] w-full text-white text-2xl font-semibold`}>Loading...</div>
    </>
  )
}

export default DiscoverSeries

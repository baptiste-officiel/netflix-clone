'use client'

import { useEffect, useRef, useState } from "react"
import Image from 'next/image'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AiOutlinePlusCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import Link from 'next/link'

import React from 'react'

const url = 'https://api.themoviedb.org/3';
const api_key = '698bd3478bb74b5fd60f2f3e36bfdc60'

function DiscoverMovies() {

    // const [dataArray, setDataArray] = useState<any[]>([])
    const [discoverMovies, setDiscoverMovies] = useState<any[]>([])
    const bottom = useRef()
    let page = 2;
  
      const getMovies = async() => {
          const res = await fetch(`${url}/movie/popular?api_key=${api_key}&language=en-US&page=${page}`)
          const data = await res.json()
          // console.log("🚀 ~ file: Movies.tsx:12 ~ getMovies ~ data:", data)
  
          // setDataArray(data)
          setDiscoverMovies((prevData) => [...prevData, data.results])
          // setDiscoverMovies(data.results)
          page++;
      }
  
      // useEffect(() => {
      //   getMovies()
      // }, [])

      useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            getMovies();
            // console.log(entries);
          }
        });
        observer.observe(bottom.current);
      }, []);
  
    // console.log("🚀 ~ file: DiscoverMovies.tsx:18 ~ DiscoverMovies ~ dataArray:", discoverMovies);
      

  return (
    <>
    {discoverMovies && 
      discoverMovies.map((items, index) => 
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
            <div className="group relative">
            <Image src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title && item.title || !item.title ? item.original_title : item.original_title || 'movie'} width={250} height={300} className="rounded-sm max-h-[300px]" />
            <div className="bg-neutral-900 w-full h-full absolute top-0 opacity-0 group-hover:opacity-80 duration-300 z-20"></div>
            <Link href={`/movie/${item.id}`} className="opacity-0 absolute z-20 group-hover:opacity-100 top-2 right-2 duration-300"><AiOutlineInfoCircle size={30} style={{color: 'white'}} /></Link>
          </div>
          </SplideSlide>
      )}
      </Splide>
      </div>
      </div>
      )
    }
    <div ref={bottom} />
    </>
  )
}

export default DiscoverMovies

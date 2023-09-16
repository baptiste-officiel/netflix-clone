'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AiOutlinePlusCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import Link from 'next/link'

import React from 'react'

const url = 'https://api.themoviedb.org/3';
const api_key = '698bd3478bb74b5fd60f2f3e36bfdc60'

function DiscoverMovies() {

    const [discoverMovies, setDiscoverMovies] = useState<any[]>([])
  
      const getMovies = async() => {
          const res = await fetch(`${url}/movie/popular?api_key=${api_key}&language=en-US&page=2`)
          const data = await res.json()
          // console.log("🚀 ~ file: Movies.tsx:12 ~ getMovies ~ data:", data)
  
          setDiscoverMovies(data.results)
      }
  
      useEffect(() => {
        getMovies()
      }, [])
  
      console.log(discoverMovies);

  return (
    <div>
      
    </div>
  )
}

export default DiscoverMovies

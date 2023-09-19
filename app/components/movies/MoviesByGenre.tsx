'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'
import '@splidejs/react-splide/css';
import { AiOutlinePlusCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import Link from 'next/link'


const url = 'https://api.themoviedb.org/3';
const api_key = '698bd3478bb74b5fd60f2f3e36bfdc60'

function MoviesByGenre() {

  const [moviesByGenre, setMoviesByGenre] = useState<any[]>([])

    const getMoviesByGenre = async() => {
        const res = await fetch(`${url}/genre/movie/list?api_key=${api_key}&language=en-US`)
        const data = await res.json()

        setMoviesByGenre(data)
    }

    useEffect(() => {
      getMoviesByGenre()
    }, [])

    console.log(moviesByGenre);
  return (
    <div>
      
    </div>
  )
}

export default MoviesByGenre

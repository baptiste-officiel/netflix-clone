'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'

const url = 'https://api.themoviedb.org/3';
const api_key = '698bd3478bb74b5fd60f2f3e36bfdc60'

export default function PopularMovies() {

  const [popularMovies, setpopularMovies] = useState<any[]>([])

    const getMovies = async() => {
        const res = await fetch(`${url}/movie/popular?api_key=${api_key}&language=en-US`)
        const data = await res.json()
        console.log("🚀 ~ file: Movies.tsx:12 ~ getMovies ~ data:", data)

        setpopularMovies(data.results)
    }

    useEffect(() => {
      getMovies()
    }, [])

    console.log(popularMovies);
    
    

  return (
    <div>
      {popularMovies && 
        popularMovies.map((item) =>
          <div key={item.id}>
            <Image />
            <h1>{item.title}</h1>
          </div>
        )
      }
    </div>
  )
}

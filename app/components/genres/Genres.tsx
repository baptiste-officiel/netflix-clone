'use client'

import React, { useEffect, useState, useRef } from "react"
import Image from 'next/image'
import '@splidejs/react-splide/css';
import { AiOutlinePlusCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import Link from 'next/link'
import Button from "../buttons/Button";


const url = 'https://api.themoviedb.org/3';
const api_key = '698bd3478bb74b5fd60f2f3e36bfdc60'

function Genres() {

  const [genres, setGenres] = useState<any[]>([])
  // const [isShow, setIsShow] = useState(true)
  const [genreId, setGenreId] = useState('')
  const [genreLabel, setGenreLabel] = useState<any[]>([])
  const [moviesByGenre, setMoviesByGenre] = useState<any[]>([])
  const bottom = React.useRef<HTMLDivElement | null>(null)
  
  const getGenres = async() => {
    const res = await fetch(`${url}/genre/movie/list?api_key=${api_key}&language=en-US`)
        const data = await res.json()
        setGenres(data.genres)
    }
      
    // get genre from clicking the button and check if genreId is empty
    const getGenreId = (id: string, label: string) => {
      setMoviesByGenre([])
      console.log(id);
      if (genreId) {
        setGenreId(genreId + `,${id}`)
      } else{
        setGenreId(genreId + `${id}`)
      }
      setGenreLabel([...genreLabel, label])
    }

    const handleReset = () => {
      setGenreId('')
      setGenreLabel([])
      setMoviesByGenre([])
    }
      
    let page = 1;
    const getMoviesByGenre = async(genreId: any) => {
      if (genreId) {
        const res = await fetch(`${url}/discover/movie?api_key=${api_key}&language=en-US&with_genres=${genreId}&page=${page}`)
        const data = await res?.json()
        console.log("🚀 ~ file: Genres.tsx:34 ~ getMoviesByGenre ~ data:", data.results)
        setMoviesByGenre([...moviesByGenre, ...data.results])
        page++;
        // setIsLoading(false)
      }
    }

    

    console.log('gerneId:', genreId);
    
      
  useEffect(() => {
    getGenres()
  }, [])
  
  useEffect(() => {
    getMoviesByGenre(genreId)
  }, [genreId])

  // useEffect(() => {  
  //   const observer = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       getMoviesByGenre(28);
  //       console.log(entries);
  //     }
  //   });
  //   observer.observe(bottom.current as Element);
  // }, []);

  console.log(moviesByGenre);

    
  return (
    <>
        <div className="flex flex-wrap gap-3 mt-4">
        {genres && 
            genres.map((item) => 
                <Button key={item.id} id={item.id} label={item.name} onClick={getGenreId} categoryAction />
            )
        }
        </div>
        <div className="mt-8">
          <div className="flex justify-between items-center gap-2 py-4">          
          <div className="flex max-w-6xl overflow-hidden gap-3">
          {genreLabel && 
            genreLabel.map((item) => 
              <h3 key={item} className="text-2xl font-medium">{item}</h3>
            )
          }
          </div>
          {genreLabel.length > 0 && 
            <Button label="Reset" onClick={handleReset} resetAction />
          }
          </div>
          <div className="flex flex-wrap gap-4 justify-between items-center">
            {moviesByGenre && 
              moviesByGenre.map((item) => 
                <div key={item.id} className={`w-1/5 rounded-md`}>
                  <Link href={`/movie/${item.id}`}>
                    <div className="group relative">
                      <div className="rounded-sm w-full overflow-hidden">
                        <Image src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title && item.title || !item.title ? item.original_title : item.original_title || 'movie'} width={250} height={300} className="rounded-sm w-full h-full scale-100 transition duration-500 group-hover:scale-125" />
                      </div>
                    <div className="bg-neutral-900 w-full h-full absolute top-0 opacity-0 group-hover:opacity-80 duration-300 z-10"></div>
                    <div className="absolute top-2 right-2 z-10 duration-300 opacity-0 group-hover:opacity-100"><AiOutlineInfoCircle size={30} style={{color: 'white'}} /></div>
                    </div>
                  </Link>
                </div>
              )
            }
          </div>
        </div>
        <div ref={bottom} />
    </>
  )
}

export default Genres

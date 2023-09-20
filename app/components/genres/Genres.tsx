'use client'

import { useEffect, useState } from "react"
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
  const [label, setLabel] = useState('')
  
  const getGenres = async() => {
    const res = await fetch(`${url}/genre/movie/list?api_key=${api_key}&language=en-US`)
        const data = await res.json()
        setGenres(data.genres)
  }

  const handleToggle = (label) => {
    // if (isShow) {
    //   setIsShow(false)
    // } else {
    //   setIsShow(true)
    // }
    setLabel(label)
  }
  console.log("🚀 ~ file: Genres.tsx:18 ~ Genres ~ label:", label)
      
  useEffect(() => {
    getGenres()
  }, [])
  console.log("🚀 ~ file: Genres.tsx:16 ~ Genres ~ Genres:", genres)
    
  return (
    <>
        <div className="flex flex-wrap gap-3 mt-4">
        {genres && 
            genres.map((item) => 
                <Button key={item.id} id={item.id} label={item.name} onClick={handleToggle} />
            )
        }
        </div>
    </>
  )
}

export default Genres

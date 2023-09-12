import { getServerSession } from "next-auth" 
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import PopularMovies from "../components/movies/PopularMovies"


async function MoviePage() {

  const data = await getServerSession(authOptions)

  if (!data) {
    redirect('/api/auth/signin?callbackUrl=/movies')
  } 

  console.log(data);
  

  return (
    <div className='bg-red-500 min-h-screen pt-28'>
      <h1>{data.user?.name}</h1>
      <PopularMovies />
    </div>
  )
}

export default MoviePage

import { getServerSession } from "next-auth" 
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import PopularMovies from "../components/movies/PopularMovies"
import DiscoverMovies from "../components/movies/DiscoverMovies"
import MoviesByGenre from "../components/movies/MoviesByGenre"


async function Browse() {

  const data = await getServerSession(authOptions)

  if (!data) {
    redirect('/api/auth/signin?callbackUrl=/browse')
  } 

  console.log(data);
  

  return (
    <div className='bg-black min-h-screen '>
      {/* <h1>{data.user?.name}</h1> */}
      <PopularMovies />
      <DiscoverMovies />
      <MoviesByGenre />
    </div>
  )
}

export default Browse

import { getServerSession } from "next-auth" 
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import DiscoverSeries from "../components/series/DiscoverSeries"
import PopularSeries from "../components/series/PopularSeries"


async function Browse() {

  const data = await getServerSession(authOptions)

  if (!data) {
    redirect('/api/auth/signin?callbackUrl=/browse')
  } 

  console.log(data);
  

  return (
    <div className='bg-black min-h-screen'>
      {/* <h1>{data.user?.name}</h1> */}
      <PopularSeries />
      <DiscoverSeries />
    </div>
  )
}

export default Browse

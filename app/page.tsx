import { getServerSession } from "next-auth" 
import { authOptions } from "./api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Navbar from "./components/navbar/Navbar"

export default async function Home() {
  const data = await getServerSession(authOptions)

  if (!data) {
    redirect('/login')
  } else {
    redirect('/users')
  }

  console.log(data);
  

  return (
    <div className='bg-red-500 min-h-screen pt-28'>
      {/* <h1>{data?.user?.name}</h1> */}
    </div>
  )
}


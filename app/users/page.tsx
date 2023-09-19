import { getServerSession } from "next-auth" 
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import User from "../components/User"



async function page() {

    const data = await getServerSession(authOptions)

    if (!data) {
        redirect('/login')
      } else {
        console.log(data?.user?.name);
      }

      

  return (
      <div className='pt-22 bg-black min-h-screen text-white flex flex-col gap-8 justify-center items-center'>
        <h1 className="text-3xl md:text-5xl md:mb-8">Who is watching ?</h1>
        <div className="w-100 lg:w-4/5 mx-auto flex justify-center items-center gap-4">
        <User name={data?.user?.name} img={data?.user?.image} />
        </div>
      </div>
  )
}

export default page

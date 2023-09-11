import { getServerSession } from "next-auth" 
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import User from "../components/User"



async function page() {

    const data = await getServerSession(authOptions)

    if (!data) {
        redirect('/api/auth/signin?callbackUrl=/users')
      } else {
        console.log(data?.user?.name);
      }

  return (
      <div className='pt-28 bg-black min-h-screen text-white flex justify-center items-center'>
        <div className="w-100 lg:w-4/5 mx-auto flex justify-center items-center gap-4">
        <User name={data?.user?.name} />
        </div>
      </div>
  )
}

export default page

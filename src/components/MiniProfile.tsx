import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"


const MiniProfile = () => {
  const { data: session } = useSession()
  
  return (
    <div className='flex items-center justify-between'>
      <img 
        src='https://media.licdn.com/dms/image/C4D03AQEJKHnUCzaTzQ/profile-displayphoto-shrink_800_800/0/1627924003185?e=2147483647&v=beta&t=krHq5etfeQaUoc1rIBA2ejYoJP5T80_6R_Eq-bftz7Y'
        alt='userPic'
        className='h-16 border rounded-full p-[2px] cursor-pointer'
      />

      <div className='mx-4'>
        <h2 className='font-bold'>nice</h2>
        <h3 className='text-sm text-gray-400'>Welcome to Instagram!</h3>
      </div>

      <button className='text-sm text-blue-400 font-semibold'>Sing Out</button>
    </div>
  )
}

export default MiniProfile
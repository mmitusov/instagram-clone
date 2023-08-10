import React from 'react'
import { useSession, signOut } from "next-auth/react"


const MiniProfile = () => {
  const { data: session } = useSession()

  return (
    <div className='flex items-center justify-between'>
      <img 
        src={session?.user?.image}
        alt='userPic'
        className='h-16 w-16 border rounded-full p-[2px] cursor-pointer'
      />

      <div className='mx-4'>
        <h2 className='font-bold'>{session?.user?.username}</h2>
        <h3 className='text-sm text-gray-400'>Welcome to Instagram!</h3>
      </div>

      <button onClick={signOut as any} className='text-sm text-blue-400 font-semibold'>Sing Out</button>
    </div>
  )
}

export default MiniProfile
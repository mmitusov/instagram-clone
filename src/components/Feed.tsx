import React from 'react'
import Srories from './Srories'
import Posts from './Posts'
import MiniProfile from './MiniProfile'
import Suggestions from './Suggestions'
import { useSession, signIn, signOut } from "next-auth/react"

const Feed = () => {
  const { data: session } = useSession()
  
  return ( //mx-auto - to center everything, since we're not using flex but grid
    <main className={`
      grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto z-10
      ${!session && '!grid-cols-1 !max-w-3xl'}
    `}>
        <section className='col-span-2 mt-5'>
          <Srories />
          <Posts />
        </section> 
        
        {
          session &&
          <section className='mt-5 ml-10 hidden xl:flex flex-col'> {/* xl:inline-grid md:col-span-1*/}
            <div className='fixed'>
              <MiniProfile />
              <Suggestions />
            </div>
          </section> 
        }
    </main>
  )
}

export default Feed
import React from 'react'
import Srories from './Srories'
import Posts from './Posts'

const Feed = () => {
  return ( //mx-auto - to center everything, since we're not using flex but grid
    <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto z-10'>
        <section className='col-span-2'>
            <Srories />
            <Posts />
        </section> 

        <section>
        </section> 
    </main>
  )
}

export default Feed
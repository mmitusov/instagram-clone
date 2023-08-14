import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';

interface Suggestions {
  _id: number,
  username: string,
  avatar: string,
  company: string
}

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestions[]>([])
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({ //Create empty erray of 5 elemets. For our project we don't need more fake profiles then that
      _id: i,
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      company: faker.company.name()
    }))
    setSuggestions(suggestions)
  }, [])
  
  return (
    <div className='mt-4'>
      <div className='flex justify-between items-center text-sm mb-5'>
        <h3 className='text-sm font-bold text-gray-400 '>Suggestions for you</h3>
        <button className='text-gray-600 font-semibold'>See all</button>
      </div>

      {
        suggestions.map(profile => (
          <div key={profile._id} className='flex justify-between items-center mt-3'>
            <img src={profile.avatar} alt='pic' className='w-10 rounded-full border p-[2px]'/>

            <div className='flex flex-col w-full ml-4'>
              <h2 className='text-sm font-semibold'>
                {profile.username}
              </h2>
              <h3 className='text-xs text-gray-400'>
                {profile.company}
              </h3>
            </div>

            <button className='text-blue-400 text-xs font-bold'>Follow</button>
          </div>
        ))
      }
    </div>
  )
}

export default Suggestions
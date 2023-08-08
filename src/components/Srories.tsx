import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';

interface Suggestions {
  _id: number,
  userId: string,
  username: string,
  email: string,
  avatar: string,
  password: string,
  birthdate: any,
  registeredAt: any
}

const Srories = () => {
  const [suggestions, setSuggestions] = useState<Suggestions[]>([])
  useEffect(() => { 
    const suggestions = [...Array(20)].map((_, i) => ({ //Create empty erray of 20 elemets. For our project we don't need more fake profiles
      _id: i,
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past()
    }))
    setSuggestions(suggestions)
  }, [])

  return ( 
    <div className='flex space-x-2 p-5 mt-5 bg-white border border-gray-200 rounded-lg overflow-x-scroll'>
      {
        suggestions.map(profile => (
          <div key={profile._id}>
            <img src={profile.avatar} className='h-14 w-14 p-[1.5px] border-2 border-red-500 rounded-full object-contain cursor-pointer'/>
            <p className='text-xs w-14 truncate'>
              {profile.username}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default Srories
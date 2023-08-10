import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import { useSession, signOut } from "next-auth/react"

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
  const { data: session } = useSession()
  const [suggestions, setSuggestions] = useState<Suggestions[]>([])
  useEffect(() => { 
    const suggestions = [...Array(20)].map((_, i) => ({ //Create empty erray of 20 elemets. For our project we don't need more fake profiles then that
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
    <div className='flex space-x-2 p-5 bg-white border border-gray-200 rounded-lg overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
      {
        session &&
        <div>
          <img src={session?.user?.image} className='h-14 w-14 p-[1.5px] border-2 border-red-500 rounded-full object-contain cursor-pointer hover:scale-110 transition transform duration-300 ease-out'/>
          <p className='text-xs w-14 truncate text-center'>
            {session?.user?.username}
          </p>
        </div>
      }
      {
        suggestions.map(profile => (
          <div key={profile._id}>
            <img src={profile.avatar} className='h-14 w-14 p-[1.5px] border-2 border-red-500 rounded-full object-contain cursor-pointer hover:scale-110 transition transform duration-300 ease-out'/>
            <p className='text-xs w-14 truncate text-center'>
              {profile.username}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default Srories
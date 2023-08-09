import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<any>([])
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({ //Create empty erray of 5 elemets. For our project we don't need more fake profiles then that
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
    <div className='mt-4'>
      <div className='flex justify-between items-center text-sm mb-5'>
        <h3 className='text-sm font-bold text-gray-400 '>Suggestions for you</h3>
        <button className='text-gray-600 font-semibold'>See all</button>
      </div>
    </div>
  )
}

export default Suggestions
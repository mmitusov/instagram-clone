import Image from 'next/image'
import React from 'react'
import { MagnifyingGlassIcon, HomeIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { PaperAirplaneIcon, PlusCircleIcon, UserGroupIcon, HeartIcon } from '@heroicons/react/24/outline'

const Header = () => {
  return ( 
    <div className='flex justify-center'>
      <div className='flex flex-1 max-w-6xl h-14 justify-between items-center '>
          <div className='relative hidden lg:flex w-24 h-full cursor-pointer'>
            <Image 
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png'
                alt='logo'
                objectFit='contain' 
                fill
            /> 
          </div>
          <div className='relative lg:hidden w-10 h-full flex-shrink-0 cursor-pointer'>
            <Image 
                  src='https://1000logos.net/wp-content/uploads/2017/02/insta-logo.png'
                  alt='logo'
                  objectFit='contain' 
                  fill
              />
          </div>

          <div className='relative flex justify-center items-center bg-white w-15 h-5'>
            <div className='absolute left-2'>
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-500'/>
            </div>
            <input type='text' placeholder='Search...' className='w-full h-8 pl-9 rounded-md border-gray-400 focus:ring-black focus:border-black'/>
          </div>

          <div className='flex justify-end items-center space-x-3'>
            <Bars3Icon className='h-8 w-8 md:hidden'/>
            <HomeIcon className='h-8 w-8 navButton'/>
            <PaperAirplaneIcon className='h-8 w-8 navButton'/>
            <PlusCircleIcon className='h-8 w-8 navButton'/>
            <UserGroupIcon className='h-8 w-8 navButton'/>
            <HeartIcon className='h-8 w-8 navButton'/>
          </div>
      </div>
    </div>
  )
}

export default Header
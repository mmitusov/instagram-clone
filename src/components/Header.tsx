import Image from 'next/image'
import React from 'react'
import { MagnifyingGlassIcon, HomeIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { PaperAirplaneIcon, PlusCircleIcon, UserGroupIcon, HeartIcon } from '@heroicons/react/24/outline'

const Header = () => {
  return ( 
    <div className='flex justify-center shadow-sm border-b bg-white sticky top-0 z-100'>
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
            <HomeIcon className='navButton'/>
            <div className='relative navButton'>
              <PaperAirplaneIcon className='navButton -rotate-90'/>
              <div className='absolute -top-2 -right-1 w-5 h-5 text-sm bg-red-500 rounded-full flex justify-center items-center animate-pulse text-white'>3</div>
            </div>
            <PlusCircleIcon className='navButton'/>
            <UserGroupIcon className='navButton'/>
            <HeartIcon className='navButton'/>
            <img 
              src='https://media.licdn.com/dms/image/C4D03AQEJKHnUCzaTzQ/profile-displayphoto-shrink_800_800/0/1627924003185?e=2147483647&v=beta&t=krHq5etfeQaUoc1rIBA2ejYoJP5T80_6R_Eq-bftz7Y'
              alt='userPic'
              className='h-8 rounded-full cursor-pointer'
            />
          </div>
      </div>
    </div>
  )
}

export default Header
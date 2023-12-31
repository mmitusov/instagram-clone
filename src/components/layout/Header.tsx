import Image from 'next/image'
import React from 'react'
import { MagnifyingGlassIcon, HomeIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { PaperAirplaneIcon, PlusCircleIcon, UserGroupIcon, HeartIcon } from '@heroicons/react/24/outline'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '@/store/modalAtom'

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const { data: session } = useSession()
  let router = useRouter()
  
  return ( 
    <div className='flex justify-center shadow-sm border-b bg-white sticky top-0 z-50'>
      <div className='flex flex-1 max-w-6xl h-14 justify-between items-center'>
          {/* Logo's */}
          <div className='relative hidden lg:flex w-24 h-full cursor-pointer'>
            <Image 
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png'
                alt='logo'
                style={{objectFit:"contain"}} 
                fill
                onClick={() => router.push('/')}
            /> 
          </div>
          <div className='relative lg:hidden w-10 h-full flex-shrink-0 cursor-pointer'>
            <Image 
                  src='https://1000logos.net/wp-content/uploads/2017/02/insta-logo.png'
                  alt='logo'
                  style={{objectFit:"contain"}} 
                  fill
                  onClick={() => router.push('/')}
              />
          </div>

          {/* Search */}
          <div className='relative flex justify-center items-center bg-white w-15 h-5'>
            <div className='absolute left-2'>
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-500'/>
            </div>
            <input type='text' placeholder='Search...' className='w-full h-8 pl-9 rounded-md border-gray-400 focus:ring-black focus:border-black'/>
          </div>

          {/* Icons */}
          <div className='flex justify-end items-center space-x-3'>
            <Bars3Icon className='h-8 w-8 md:hidden'/>
            <HomeIcon className='navButton' onClick={() => router.push('/')}/>
            {
              session
                ?
                  <>
                    <div className='relative hidden md:flex' onClick={() => router.push('/messages')}>
                      <PaperAirplaneIcon className='navButton -rotate-90'/>
                      <div className='absolute -top-2 -right-1 w-5 h-5 text-sm bg-red-500 rounded-full flex justify-center items-center animate-pulse text-white'>3</div>
                    </div>
                    <PlusCircleIcon className='navButton' onClick={() => setIsModalOpen(true)}/>
                    <UserGroupIcon className='navButton' onClick={() => router.push('/friends')}/>
                    <HeartIcon className='navButton' onClick={() => router.push('/likes')}/>
                    <img
                      src={session?.user?.image}
                      alt='userPic'
                      className='h-8 w-8 rounded-full'
                    />
                  </>
                :
                  <button onClick={signIn as any}>Sign In</button>
            }

          </div>
      </div>
    </div>
  )
}

export default Header
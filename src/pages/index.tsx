import Feed from '@/components/Feed'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Insta-Clone 1.0',
  description: 'Welcome to Next.js',
};

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return ( //h-screen - делает наш елемент на всю высоту екрана
    <div className='flex flex-col bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'> 
      <Header />
      <Feed />
    </div>
  )
}

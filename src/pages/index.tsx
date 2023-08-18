import Feed from '@/components/Feed'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next';
import Modal from '@/components/Modal';

export const metadata: Metadata = {
  title: 'Insta-Clone 1.0',
  description: 'Welcome to Insta-Clone',
};

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return ( //h-screen - делает наш елемент на всю высоту екрана
    <div className='flex flex-col bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'> 
      <Feed />
      <Modal />
    </div>
  )
}

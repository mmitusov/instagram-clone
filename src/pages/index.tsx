import Feed from '@/components/Feed'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return ( //h-screen - делает наш елемент на всю высоту екрана
    <div className='flex flex-col bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'> 
      <Head>
        <title>Inta-Clone</title>
      </Head>
      <Header />
      <Feed />
    </div>
  )
}

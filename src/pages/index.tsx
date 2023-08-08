import Feed from '@/components/Feed'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Head>
        <title>Inta-Clone</title>
      </Head>
      <Header />
      <Feed />
    </div>
  )
}

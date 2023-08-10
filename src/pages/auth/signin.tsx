import { getProviders, signIn } from 'next-auth/react'
import React from 'react'

const signInPage = ({ providers }: any) => {

  return (
    <> 
      <div className='flex flex-col items-center justify-center min-h-screen py-2 px-14 -mt-56 text-center'>
        <img 
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png' 
          alt='AppLogo'
          className='w-60'
        />

        <p className='font-bold'>This is NOT official Instagram app. <br/>This is personal side project.</p>

        <div className='mt-40'>
          {/* Looping trough list of providers that we created in [...nextauth].ts */}
          {Object.values(providers).map((provider: any) => (
            <div key={provider.name}>
              <button 
                onClick={() => signIn(provider.id)} 
                className='p-3 bg-blue-400 rounded-lg text-white'
              >
                Sign in with {provider.name} {/* Dynamicly displaing names of the providers */}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default signInPage

export async function getServerSideProps() {
  const providers: any = await getProviders();
  
  return {
    props: { providers },
  }
}
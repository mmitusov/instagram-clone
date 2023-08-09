import { getProviders, signIn } from 'next-auth/react'
import React from 'react'

const signInPage = ({ providers }: any) => {

  return (
    <>
      {/* Looping trough list of providers that we created in [...nextauth].ts */}
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name} {/* Dynamicly displaing names of the providers */}
          </button>
        </div>
      ))}
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
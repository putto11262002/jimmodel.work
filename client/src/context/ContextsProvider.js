import React from 'react'
import SecuredContextProvider from './secured/SecuredContextProvider'
import UnsecuredContextProvider from './unsecured/UnsecuredContextProvider'

export default function ContextsProvider({children}) {
  return (
      <UnsecuredContextProvider>
          <SecuredContextProvider>
              {children}
          </SecuredContextProvider>
      </UnsecuredContextProvider>
   
  )
}

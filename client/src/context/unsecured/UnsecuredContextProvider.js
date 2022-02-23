
import SessionContextProvider from "./sessionContext"
import AlertContextProvider from "./alertContext"


export default function UnsecuredContextProvider({children}) {
  return (
    <>
    <AlertContextProvider>
        <SessionContextProvider>
            {children}
        </SessionContextProvider>
      
    </AlertContextProvider>

    </>
  )
}

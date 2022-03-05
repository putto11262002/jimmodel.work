import { createContext, useContext, useState } from "react";

const createJobModalContext = createContext();

export const useCreateJobModalContext = () => {
    return useContext(createJobModalContext)
}

const initialCreateJobModalState = false


export default function CreateJobModalContextProvider({children}){
    const [showCreateJobModal, setShowCreateJobModal] = useState(initialCreateJobModalState)

    function setShow(){
        setShowCreateJobModal(true)
    }

    function setHide(){
        setShowCreateJobModal(false)
    }

    const createJobModalStore = {
        show: showCreateJobModal,
        createJobModalActions: {
            setHide,
            setShow
        }
    }

    return (
        <createJobModalContext.Provider value={createJobModalStore}>{children}</createJobModalContext.Provider>
    )
}
import { useState } from "react";
import { createContext, useContext } from "react";

const blockModelModalContext = createContext();

export const useBlockModelModalContext = () => {
    return useContext(blockModelModalContext)
}

export default function BlockModelModalContextProvider({children}){
    const [showBlockModelModal, setShowBlockModelModal] = useState(false);
    function setShow(){
        setShowBlockModelModal(true)
    }
    function setHide(){
        setShowBlockModelModal(false)
    }

    const blockModelModalStore = {
        show:showBlockModelModal,
        blockModelModalActions:{
            setShow,
            setHide
        }
    }

    return (
        <blockModelModalContext.Provider value={blockModelModalStore}>{children}</blockModelModalContext.Provider>
    )
}
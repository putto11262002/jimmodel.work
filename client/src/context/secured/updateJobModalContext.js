import { createContext, useContext, useState } from "react";

const updateJobModalContext = createContext();
export function useUpdateJobModalContext(){
    return useContext(updateJobModalContext);
}

const initialUpdateJobModalState = {
    show: false,
    job_id: null
}

export default function UpdateJobModalContextProvider({children}){
    const [updateJobModal, setUpdateJobModal] = useState(initialUpdateJobModalState);
    function setShow(job_id){
        setUpdateJobModal({job_id, show: true})
    }
    function setHide(){
        setUpdateJobModal(initialUpdateJobModalState)
    }

    const updateJobModalStore = {
        show: updateJobModal.show,
       job_id: updateJobModal.job_id,
        updateJobModalActions: {
            setHide,
            setShow
        }
    }

    return (
        <updateJobModalContext.Provider value={updateJobModalStore}>{children}</updateJobModalContext.Provider>
    )
    

}
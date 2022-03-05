import { createContext, useContext, useState } from "react";

const dayModalContext = createContext();

export function useDayModalContext(){
    return useContext(dayModalContext);
}

const dayModalInitialState = {
    show: false,
    data: {}
}

export default function DayModalContextProvider({children}){
    const [dayModal, setDayModal] = useState(dayModalInitialState);
    function setShow(data){
        setDayModal({show: true, data});
    };

    function setHide(){
        setDayModal(dayModalInitialState)
    }

    const dayModalStore = {
       show:  dayModal.show,
       data: dayModal.data,
       dayModalActions: {
           setShow,
           setHide
       }
    }

    return (
        <dayModalContext.Provider value={dayModalStore}>{children}</dayModalContext.Provider>
    )

}
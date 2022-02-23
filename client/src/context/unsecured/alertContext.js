import { createContext, useContext, useState } from "react";

const alertContext = createContext({});

export const useAlertContext =() => {
    return useContext(alertContext);
}

const initialAlertState = {
    show: false,
    message: null,
    colour: null
}
export default function AlertContextProvider({children}) {
    const [alert, setAlert] = useState(initialAlertState);

    function setShow(message, colour){
        setAlert({
            show: true,
            message,
            colour
        });
    }

    function setHide() {
        setAlert(initialAlertState)
    }

    const alertStore = {
        alert: alert,
        alertActions: {
            setShow,
            setHide
        }   
    }

    return (
        <alertContext.Provider value={alertStore}>{children}</alertContext.Provider>
    )
}
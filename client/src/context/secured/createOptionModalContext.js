import { createContext, useContext, useState } from "react";

const createOptionModalContext = createContext();

export function useCreateOptionModalContext() {
  return useContext(createOptionModalContext);
}

const initialCreateJobState = false;

export default function CreateOptionModalContextProvider({ children }) {
  const [createOptionModal, setCreateOptionModal] = useState(
    initialCreateJobState
  );
  function setHide() {
    setCreateOptionModal(false);
  }

  function setShow() {
    setCreateOptionModal(true);
  }

  const createOptionModalStore = {
    show: createOptionModal,
    createOptionModalActions: {
      setShow,
      setHide,
    },
  };

  return (
    <createOptionModalContext.Provider value={createOptionModalStore}>
      {children}
    </createOptionModalContext.Provider>
  );
}

import { createContext, useContext, useState } from "react";

const optionModalContext = createContext();
export function useOptionModalContext() {
  return useContext(optionModalContext);
}

const initialOptionModalState = {
  show: false,
  job_id: null,
};

export default function OptionModalContextProvider({ children }) {
  const [optionModal, setOptionModal] = useState(
    initialOptionModalState
  );
  function setShow(job_id) {
    setOptionModal({ job_id, show: true });
  }
  function setHide() {
    setOptionModal(initialOptionModalState);
  }

  const optionModalStore = {
    show: optionModal.show,
    job_id: optionModal.job_id,
    optionModalActions: {
      setHide,
      setShow,
    },
  };

  return (
    <optionModalContext.Provider value={optionModalStore}>
      {children}
    </optionModalContext.Provider>
  );
}

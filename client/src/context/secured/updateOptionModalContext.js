import { createContext, useContext, useState } from "react";

const updateOptionModalContext = createContext();
export function useUpdateOptionModalContext() {
  return useContext(updateOptionModalContext);
}

const initialUpdateOptionModalState = {
  show: false,
  job_id: null,
};

export default function UpdateOptionModalContextProvider({ children }) {
  const [updateOptionModal, setUpdateOptionModal] = useState(
    initialUpdateOptionModalState
  );
  function setShow(job_id) {
    setUpdateOptionModal({ job_id, show: true });
  }
  function setHide() {
    setUpdateOptionModal(initialUpdateOptionModalState);
  }

  const updateOptionModalStore = {
    show: updateOptionModal.show,
    job_id: updateOptionModal.job_id,
    updateOptionModalActions: {
      setHide,
      setShow,
    },
  };

  return (
    <updateOptionModalContext.Provider value={updateOptionModalStore}>
      {children}
    </updateOptionModalContext.Provider>
  );
}

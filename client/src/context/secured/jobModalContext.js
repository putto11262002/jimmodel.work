import { createContext, useContext, useState } from "react";

const jobModalContext = createContext();
export function useJobModalContext() {
  return useContext(jobModalContext);
}

const initialJobModalState = {
  show: false,
  job_id: null,
};

export default function JobModalContextProvider({ children }) {
  const [jobModal, setJobModal] = useState(
    initialJobModalState
  );
  function setShow(job_id) {
    setJobModal({ job_id, show: true });
  }
  function setHide() {
    setJobModal(initialJobModalState);
  }

  const jobModalStore = {
    show: jobModal.show,
    job_id: jobModal.job_id,
    jobModalActions: {
      setHide,
      setShow,
    },
  };

  return (
    <jobModalContext.Provider value={jobModalStore}>
      {children}
    </jobModalContext.Provider>
  );
}

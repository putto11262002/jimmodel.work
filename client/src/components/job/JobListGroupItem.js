import React from 'react'
import { Dropdown, ListGroup } from 'react-bootstrap'
import { useAlertContext } from '../../context/unsecured/alertContext';
import { useJobContext } from '../../context/secured/jobContext';
import { useJobModalContext } from '../../context/secured/jobModalContext';
import { useUpdateJobModalContext } from '../../context/secured/updateJobModalContext';
import docService from '../../services/doc.service';
import { useSessionContext } from '../../context/unsecured/sessionContext';
export default function JobListGroupItem({data}) {
    const {updateJobModalActions} = useUpdateJobModalContext();
    const {jobModalActions} = useJobModalContext();
    const {jobActions} = useJobContext();
    const {alertActions} = useAlertContext();
    const {sessionActions} = useSessionContext()
    async function getJobConfirmation(job_id) {
        try {
          const res = await docService.getJobConfirmation(job_id);
          const resData = await res.data;
          const file = new Blob([resData], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        } catch (err) {
          if (err.response.status === 401) {
            sessionActions.clearSession();
            return
           }
          console.error(err.response.data);
          alertActions.setShow(err.response.data, "danger");
        }
      }
    
      async function handleDeleteJob(job_id) {
        try {
          await jobActions.deleteJob(job_id);
        } catch (err) {
          console.error(err);
        }
      }
  return (
    <ListGroup.Item
    
   
    className={`d-flex align-items-center  ${(data.type === 'fitting' || data.type === 'rehearsal') ? "bg-fitting" : "bg-job"}`}
    
   
  >
    <p className={`p-0 my-0 d-inline fw-bold  text-truncate ${(data.type !== 'fitting' && data.type !== "rehearsal")? 'text-white' : 'text-dark'}`}>{data.title} <span className='fw-normal'> {data.Models.length > 0 && " - "}  {data.Models.map((model, index) => index === data.Models.length -1 ?  model.first_name : model.first_name + ", ")}</span></p>

    
      <Dropdown className="ms-auto d-inline mx-2" align="end">
        <Dropdown.Toggle
          variant="white"
          className="m-0 p-0"
          id="dropdown-autoclose-true"
        >
          <i className={`bi bi-three-dots  ${(data.type !== 'fitting' && data.type !== "rehearsal")? 'text-white' : 'text-dark'}`}></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => updateJobModalActions.setShow(data.job_id)}
           
          >
            Edit job
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => jobModalActions.setShow(data.job_id)}
          
          >
            View job
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => getJobConfirmation(data.job_id)}
           
          >
            Job Confirmation
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleDeleteJob(data.job_id)}
           
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
   
  </ListGroup.Item>
  )
}

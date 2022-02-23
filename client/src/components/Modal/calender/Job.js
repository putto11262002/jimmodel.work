import { useEffect, useState } from "react";
import { Dropdown, ListGroupItem } from "react-bootstrap";
import { useJobContext } from "../../../context/secured/jobContext";

import { useJobModalContext } from "../../../context/secured/jobModalContext";
import { useOptionModalContext } from "../../../context/secured/optionModalContext";
import { useUpdateJobModalContext } from "../../../context/secured/updateJobModalContext";
import { useUpdateOptionModalContext } from "../../../context/secured/updateOptionModalContext";
const Job = ({ data }) => {
  const { jobActions } = useJobContext();
  const {updateOptionModalActions} = useUpdateOptionModalContext();
  const {updateJobModalActions} = useUpdateJobModalContext();
  const {jobModalActions} = useJobModalContext();
  const {optionModalActions} = useOptionModalContext()
  
 
 
  return (
    <ListGroupItem className={`my-2 rounded d-flex justify-content-between align-items-center ${data.type !== 'option' && (data.type === 'job' ? 'bg-dark text-white' : 'bg-warning')}`} style={{background: `${data.User.colour}`}}>
     <div className="flex-fill d-flex justify-content-start align-items-center gap-2 overflow-hidden">
     <p className="my-0 text-nowrap px-2 mw-50 text-overflow-ellipsis">
         {/* <i className="bi bi-briefcase-fill me-2"></i> */}
         {data.title}</p>
      {/* <div className="w-50 d-flex align-items-center justify-content-start gap-1 overflow-hidden">
      <i className="bi bi-people-fill me-1"></i>
          {data.Models.map((model, index) => {
              return <ProfileImage key={index} width={1.5} height={1.5} src={process.env.REACT_APP_API_END_POINT + model.profile_img_1}/>
          })}
      </div> */}
     </div>
      <Dropdown className=" d-inline mx-2" align="end">
        <Dropdown.Toggle
          variant="white"
          className="m-0 p-0 text-white"
          id="dropdown-autoclose-true"
        >
          <i className="bi bi-three-dots"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => data.type ? updateJobModalActions.setShow(data.job_id) : updateOptionModalActions.setShow(data.job_id)} action>Edit job</Dropdown.Item>
          <Dropdown.Item onClick={() => data.type ? jobModalActions.setShow(data.job_id) : optionModalActions.setShow(data.job_id)} action>View job</Dropdown.Item>
          <Dropdown.Item action>Job Confirmation</Dropdown.Item>
          <Dropdown.Item action>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ListGroupItem>
  );
};

export default Job;

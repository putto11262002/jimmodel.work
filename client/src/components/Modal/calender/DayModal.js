import { CloseButton, ListGroup, Modal, ListGroupItem} from "react-bootstrap"
import { useDayModalContext } from "../../../context/secured/dayModalContext";
import { useJobContext } from "../../../context/secured/jobContext";
import { datetimeFormatter, dateFormatter } from "../../../helper/Formatter"

import JobListGroupItem from "../../job/JobListGroupItem";
import OptionListGroupItem from "../../option/OptionListGroupItem";
import Job from "./Job";

export default function DayModal() {
    const {dayModalActions, data} = useDayModalContext();
    const {jobActions} = useJobContext();

    async function handleDelete(job_id) {
        try {
          await jobActions.deleteOption(job_id);
        } catch (err) {
          console.error(err);
        }
      }

    
   

   
  return (
    <Modal backdrop="static" backdropClassName="custom-blackdrop" className="custom-modal"  show="true" centered={true}>
        <Modal.Header>
            <Modal.Title>{dateFormatter(data.date)}</Modal.Title>
            <CloseButton onClick={() => dayModalActions.setHide()}></CloseButton>
        </Modal.Header>
        <Modal.Body>
            <ListGroup >
                {data.jobs.map((job, index) => {
                 
                   
                        if(job.type === "block_model"){
                       
                            return <ListGroupItem className="bg-block-model d-flex flex-wrap align-items-center" key={index}>
                                 <p className={`fs-xs w-100 m-0`}>Booked at: {datetimeFormatter(job.createdAt)} by: {job.User.first_name + " " + job.User.last_name}</p>
                                
                                <p className="fw-bold m-0 p-0 d-inline">{job.title} <span className="fw-normal">{job.Models.length > 0 && " - "}{job.Models.map((model, index) => {
                               
                                return index === job.Models.length - 1 ?  model.first_name : model.first_name + ", "})}</span></p><span className="ms-auto me-2"><i onClick={() => handleDelete(job.job_id)} className="bi bi-trash-fill"></i></span></ListGroupItem>
                        }else{
                            if(job.status){
                              
                                 return <JobListGroupItem key={index} data={job}/>
                             }else{
                                 return <OptionListGroupItem key={index} data={job}/>
                             }
                        }
                       
                  
                })}
            </ListGroup>
        </Modal.Body>

   </Modal>
  )
}

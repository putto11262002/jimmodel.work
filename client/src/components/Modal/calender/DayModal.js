import { CloseButton, ListGroup, Modal, ListGroupItem} from "react-bootstrap"
import { useDayModalContext } from "../../../context/secured/dayModalContext";
import { dateFormatter } from "../../../helper/Formatter"
import jobService from "../../../services/job.service";
import JobListGroupItem from "../../job/JobListGroupItem";
import OptionListGroupItem from "../../option/OptionListGroupItem";
import Job from "./Job";

export default function DayModal() {
    const {dayModalActions, data} = useDayModalContext();
   
   console.log(data.jobs)
   
  return (
    <Modal backdrop="static" backdropClassName="custom-blackdrop" className="custom-modal"  show="true" centered={true}>
        <Modal.Header>
            <Modal.Title>{dateFormatter(data.date)}</Modal.Title>
            <CloseButton onClick={() => dayModalActions.setHide()}></CloseButton>
        </Modal.Header>
        <Modal.Body>
            <ListGroup >
                {data.jobs.map((job, index) => {
                    console.log(job)
                   
                        if(job.type === "block_model"){
                            console.log('1')
                            return <ListGroupItem className="bg-block-model" key={index}><p className="fw-bold m-0 p-0">{job.title} <span className="fw-normal">{job.Models.length > 0 && " - "}{job.Models.map((model, index) => {
                               
                                return index === job.Models.length - 1 ?  model.first_name : model.first_name + ", "})}</span></p></ListGroupItem>
                        }else{
                            if(job.status){
                                console.log('2')
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

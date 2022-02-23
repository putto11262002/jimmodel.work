import { CloseButton, ListGroup, Modal } from "react-bootstrap"
import { useDayModalContext } from "../../../context/secured/dayModalContext";
import { dateFormatter } from "../../../helper/Formatter"
import JobListGroupItem from "../../job/JobListGroupItem";
import OptionListGroupItem from "../../option/OptionListGroupItem";
import Job from "./Job";

export default function DayModal() {
    const {dayModalActions, data} = useDayModalContext();
   
   
   
  return (
    <Modal backdrop="static" backdropClassName="custom-blackdrop" className="custom-modal"  show="true" centered={true}>
        <Modal.Header>
            <Modal.Title>{dateFormatter(data.date)}</Modal.Title>
            <CloseButton onClick={() => dayModalActions.setHide()}></CloseButton>
        </Modal.Header>
        <Modal.Body>
            <ListGroup >
                {data.jobs.map((job, index) => {
                  
                        if(job.status){
                            return <JobListGroupItem key={index} data={job}/>
                        }else{
                            return <OptionListGroupItem key={index} data={job}/>
                        }
                  
                })}
            </ListGroup>
        </Modal.Body>

   </Modal>
  )
}

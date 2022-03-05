import { datetimeFormatter, textFormatter, jobDateFormatter } from "../../../helper/Formatter";
import { useEffect, useState } from "react";
import ProfileImage from "../../shared/image/ProfileImage";
import { Modal, ListGroup, CloseButton, Badge } from "react-bootstrap";
import { useOptionModalContext } from "../../../context/secured/optionModalContext";
import Loader from "../../shared/Loader";
import { useJobContext } from "../../../context/secured/jobContext";
import { useSessionContext } from "../../../context/unsecured/sessionContext";
import ModelListGroupItem from "../../model/ModelListGroupItem";

export default function OptionModal() {
  const [option, setOption] = useState({});
  const { optionModalActions, job_id } = useOptionModalContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { jobActions } = useJobContext();
  const {sessionActions} = useSessionContext()

  useEffect(async () => {
    try {
      setLoading(true);
      const fetchedOption = await jobActions.getOption(job_id);
      setOption(fetchedOption);
      setLoading(false);
    } catch (err) {
      if (err.status === 401) {
        sessionActions.clearSession();
        return;
       }
    
      console.error(err);
      setError(true);
    }
  }, []);
  
  return (
    <Modal
      backdrop="static"
      backdropClassName="custom-blackdrop"
      className="custom-modal"
      show="true"
    >
      <Modal.Header>
        <Modal.Title>{option.title}</Modal.Title>
        <CloseButton onClick={() => optionModalActions.setHide()} />
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Loader />
        ) : (
          <ListGroup variant="flush">
            
          
         

            <ListGroup.Item className="px-0">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Shooting Schedule</div>
              <div className='d-flex w-100 align-items-center flex-wrap gap-2'>
              {
               
          
              Object.entries(jobDateFormatter(option.JobDates)).map(([month, days], index) => {
               
                
                return (
                 <div key={index} className='bg-light px-2 py-2 rounded d-flex align-items-center flex-start gap-1'><span  className='me-2'>{month}</span> {days.map((day, index) => {
                  if(day.type === "shooting_date"){
                    return <Badge  className='bg-white text-primary fw-normal' key={index} >{day.date.getDate()}</Badge>
                  }
                 })}</div>
                )
              })}
              </div>
            </div>
          </ListGroup.Item>
         
          <ListGroup.Item className="px-0">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Fitting Schedule</div>
              <div className='d-flex w-100 align-items-center flex-wrap gap-2'>
              {
               
          
              Object.entries(jobDateFormatter(option.JobDates)).map(([month, days], index) => {
               
                
                return (
                 <div key={index} className='bg-light px-2 py-2 rounded d-flex align-items-center flex-start gap-1'><span  className='me-2'>{month}</span> {days.map((day, index) => {
                  if(day.type === "fitting_date"){
                    return <Badge  className='bg-white text-primary fw-normal' key={index} >{day.date.getDate()}</Badge>
                  }
                 })}</div>
                )
              })}
              </div>
            </div>
          </ListGroup.Item>

          <ListGroup.Item className="px-0">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Rehearsal Schedule</div>
              <div className='d-flex w-100 align-items-center flex-wrap gap-2'>
              {
               
          
              Object.entries(jobDateFormatter(option.JobDates)).map(([month, days], index) => {
               
                
                return (
                 <div key={index} className='bg-light px-2 py-2 rounded d-flex align-items-center flex-start gap-1'><span  className='me-2'>{month}</span> {days.map((day, index) => {
                
                  if(day.type === "rehearsal_date"){
                    return <Badge  className='bg-white text-primary fw-normal' key={index} >{day.date.getDate()}</Badge>
                  }
                 })}</div>
                )
              })}
              </div>
            </div>
          </ListGroup.Item>

          <ListGroup.Item className="px-0">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Final meeting Schedule</div>
              <div className='d-flex w-100 align-items-center flex-wrap gap-2'>
              {
               
          
              Object.entries(jobDateFormatter(option.JobDates)).map(([month, days], index) => {
               
                
                return (
                 <div key={index} className='bg-light px-2 py-2 rounded d-flex align-items-center flex-start gap-1'><span  className='me-2'>{month}</span> {days.map((day, index) => {
                
                  if(day.type === "final_meeting_date"){
                    return <Badge  className='bg-white text-primary fw-normal' key={index} >{day.date.getDate()}</Badge>
                  }
                 })}</div>
                )
              })}
              </div>
            </div>
          </ListGroup.Item>




            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Working hour</div>
                {textFormatter(option.working_hour)}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Talent booked</div>
                <ListGroup className="my-2">
                  {option.Models.map((model, index) => {
                    return (
                     <ModelListGroupItem key={index} data={model} />
                    );
                  })}
                </ListGroup>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Client</div>
                {textFormatter(option.client)}
              </div>
            </ListGroup.Item>
        
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Media released</div>
                {textFormatter(option.media_released)}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Territories released</div>
                {textFormatter(option.territories_released)}
              </div>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Modal.Body>
    </Modal>
  );
}

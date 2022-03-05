import { jobDateFormatter, datetimeFormatter, textFormatter } from "../../../helper/Formatter";
import { useEffect, useState } from "react";
import ProfileImage from "../../shared/image/ProfileImage";
import { Modal, ListGroup, CloseButton,Badge } from "react-bootstrap";
import Loader from "../../shared/Loader";
import { useJobContext } from "../../../context/secured/jobContext";
import { useJobModalContext } from "../../../context/secured/jobModalContext";
import ModelListGroupItem from "../../model/ModelListGroupItem";

export default function JobModal() {
  const [job, setJob] = useState({});
  const { jobModalActions, job_id } = useJobModalContext()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { jobActions } = useJobContext();

  useEffect(async () => {
    try {
      setLoading(true);
      const fetchedJob = await jobActions.getJob(job_id);
      setJob(fetchedJob);
      setLoading(false)
    } catch (err) {
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
        <Modal.Title>{job.title}</Modal.Title>
        <CloseButton onClick={() => jobModalActions.setHide()} />
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Loader />
        ) : (
          <ListGroup variant="flush">
                <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Client</div>
                {textFormatter(job.client)}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Client address</div>
                {textFormatter(job.client_address)}
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Booked by</div>
                <ListGroup className="my-2">
                  <ListGroup.Item action >
                  <ProfileImage
                          width={1.5}
                          height={1.5}
                          src={
                            process.env.REACT_APP_API_END_POINT +
                            job.User.profile_img
                          }
                        />
                          <span className="ms-3 my-0">
                          {job.User.first_name + " " + job.User.last_name}
                        </span>

                  </ListGroup.Item>
                </ListGroup>
              
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Talent booked</div>
                <ListGroup className="my-2 mx-0">
                  {job.Models.map((model, index) => {
                    return (
                     <ModelListGroupItem key={index} data={model}/>
                    );
                  })}
                </ListGroup>
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Person in charge</div>
                {textFormatter(job.person_in_charge)}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Media released</div>
                {textFormatter(job.media_released)}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Period released</div>
                {textFormatter(job.period_released)}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Territories released</div>
                {textFormatter(job.territories_released)}
              </div>
            </ListGroup.Item>
           
           


            <ListGroup.Item className="px-0">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Shooting Schedule</div>
              <div className='d-flex w-100 align-items-center flex-wrap gap-2'>
              {
               
          
              Object.entries(jobDateFormatter(job.JobDates)).map(([month, days], index) => {
               
                
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
               
          
              Object.entries(jobDateFormatter(job.JobDates)).map(([month, days], index) => {
               
                
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
               
          
              Object.entries(jobDateFormatter(job.JobDates)).map(([month, days], index) => {
               
                
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
               
          
              Object.entries(jobDateFormatter(job.JobDates)).map(([month, days], index) => {
               
                
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
                {textFormatter(job.working_hour)}
              </div>
            </ListGroup.Item>


            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Venue of shoot</div>
                {textFormatter(job.venue_of_shoot)}
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Overtime per hour</div>
                {textFormatter(job.overtime_per_hour)}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Terms of payment</div>
                {textFormatter(job.terms_of_payment)}
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Fee as agreed</div>
                {textFormatter(job.fee_as_agreed)}
              </div>
            </ListGroup.Item>

          

            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Cancellation fee</div>
                {textFormatter(job.cancellation_fee)}
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Contract details</div>
                {textFormatter(job.contract_details)}
              </div>
            </ListGroup.Item>


         
          </ListGroup>
        )}
      </Modal.Body>
    </Modal>
  );
}

import { Card, ListGroup, Dropdown, Badge } from "react-bootstrap";
import { datetimeFormatter, textFormatter, jobDateFormatter } from "../../helper/Formatter";
import ProfileImage from "../shared/image/ProfileImage";
import { useUpdateJobModalContext } from "../../context/secured/updateJobModalContext";
import { useJobModalContext } from "../../context/secured/jobModalContext";
import docService from '../../services/doc.service';
import { useAlertContext } from "../../context/unsecured/alertContext";
import { useJobContext } from "../../context/secured/jobContext";
import { useSessionContext } from "../../context/unsecured/sessionContext";
import ModelListGroupItem from "../model/ModelListGroupItem";
export default function JobCard({ data }) {
  const {updateJobModalActions} = useUpdateJobModalContext();
  const {jobModalActions} = useJobModalContext();
  const {alertActions} = useAlertContext();
  const {jobActions} = useJobContext();
  const {sessionActions} = useSessionContext()

  async function getJobConfirmation(){
    try{
      const res = await docService.getJobConfirmation(data.job_id);
      const resData = await res.data;
      const file = new Blob(
        [resData], 
        {type: 'application/pdf'}
      );
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);  
    }catch(err){
      if (err.response.status === 401) {
        sessionActions.clearSession();
        return;
       }
      console.error(err.response.data);
      alertActions.setShow(err.response.data, 'danger')
     


    }
  }

  async function handleDeleteJob(){
    try{
      await jobActions.deleteJob(data.job_id);
    }catch(err){
      console.error(err)
    }

  }
  
  return (
    <Card className="shadow-sm">
      <Card.Header className="d-flex justify-content-between bg-white align-items-center">
        <h6 className="m-0 mx-2">{data.title}</h6>
        <Dropdown className=" d-inline mx-2" align="end">
          <Dropdown.Toggle
            variant="white"
            className="m-0 p-0"
            id="dropdown-autoclose-true"
          >
            <i className="bi bi-three-dots"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => updateJobModalActions.setShow(data.job_id)} >Edit job</Dropdown.Item>
            <Dropdown.Item onClick={() => jobModalActions.setShow(data.job_id)}>View job</Dropdown.Item>
            <Dropdown.Item onClick={getJobConfirmation}>Job Confirmation</Dropdown.Item>
            <Dropdown.Item onClick={handleDeleteJob} >Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">

        <ListGroup.Item className="px-0">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Booked by</div>
              <ListGroup className="my-2">
              
                    <ListGroup.Item>
                      <ProfileImage
                        width={1.5}
                        height={1.5}
                        src={
                          process.env.REACT_APP_API_END_POINT +
                          data.User.profile_img
                        }
                      />
                      <span className="mx-3 my-0">
                        {data.User.first_name + " " + data.User.last_name}
                      </span>
                    </ListGroup.Item>
               
              </ListGroup>
            </div>
          </ListGroup.Item>

          <ListGroup.Item className="px-0">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Shooting Schedule</div>
              <div className='d-flex w-100 align-items-center flex-wrap gap-2'>
              {
               
          
              Object.entries(jobDateFormatter(data.JobDates)).map(([month, days], index) => {
               
                
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
               
          
              Object.entries(jobDateFormatter(data.JobDates)).map(([month, days], index) => {
               
                
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
               
          
              Object.entries(jobDateFormatter(data.JobDates)).map(([month, days], index) => {
               
                
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
               
          
              Object.entries(jobDateFormatter(data.JobDates)).map(([month, days], index) => {
               
                
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
              <div className="fw-bold">Talent booked</div>
              <ListGroup className="my-2">
                {data.Models.map((model, index) => {
                  return (
                   <ModelListGroupItem data={model} key={index}/>
                  );
                })}
              </ListGroup>
            </div>
          </ListGroup.Item>

          <ListGroup.Item className="px-0">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Venue of shoot</div>
              {textFormatter(data.venue_of_shoot)}
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

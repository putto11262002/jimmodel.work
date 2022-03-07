import React from 'react'
import { Card, Dropdown, DropdownButton, ListGroup, Button, Badge } from 'react-bootstrap';
import { useJobContext } from '../../context/secured/jobContext';
import { useOptionModalContext } from '../../context/secured/optionModalContext';
import { useUpdateOptionModalContext } from '../../context/secured/updateOptionModalContext';
import { datetimeFormatter, jobDateFormatter } from '../../helper/Formatter';
import ModelListGroupItem from '../model/ModelListGroupItem';
import ProfileImage from '../shared/image/ProfileImage';
export default function OptionCard({data}) {
  const {optionModalActions} = useOptionModalContext();
  const {updateOptionModalActions} = useUpdateOptionModalContext();
  const {jobActions} = useJobContext()
  async function handleDeleteOption(){
    try{
      const confirm = window.confirm("Are you sure you want to confirm this option?")
      if(!confirm) return;
      await jobActions.deleteOption(data.job_id);
    }catch(err){
      console.error(err)
    }

  }

  async function confirmOption(){
    try{
      const confirm = window.confirm("Are you sure you want to confirm this option?")
     if(!confirm) return;
      const updatedOption = await jobActions.updateOption(data.job_id, {...data, status: true, JobDates: data.JobDates.map(jobDate => {
        return {...jobDate, date: new Date(jobDate.date)}
      }), Models: data.Models.map(model => model.model_id)})
    }catch(err){
      console.error(err)
    }
  }

  return  <Card className="shadow-sm">
        <Card.Header className="d-flex justify-content-between bg-white align-items-center"><h6 className="m-0 mx-2">
          {data.title}
          </h6>
          <Dropdown className=" d-inline mx-2" align="end">
        <Dropdown.Toggle
          variant="white"
          className="m-0 p-0"
          id="dropdown-autoclose-true"
        >
          <i className="bi bi-three-dots"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => updateOptionModalActions.setShow(data.job_id)}>Edit job</Dropdown.Item>
          <Dropdown.Item onClick={() => optionModalActions.setShow(data.job_id)} >View option</Dropdown.Item>
        
          <Dropdown.Item onClick={handleDeleteOption} >Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
          </Card.Header>
          <Card.Body>
        <ListGroup variant="flush">
        <ListGroup.Item className="px-0">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Booked by</div>
              <ListGroup className="my-2">
              
                    <ListGroup.Item  >
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
                    return <Badge className='bg-white text-primary fw-normal' key={index} >{day.date.getDate()}</Badge>
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
                      )
                  })}
              </ListGroup>
            </div>
          </ListGroup.Item>

        
        </ListGroup>
        <Button onClick={confirmOption} variant='light' className='mb-2 mt-1 mx-2 text-primary'>Confirm</Button>
      </Card.Body>

  </Card>;
}

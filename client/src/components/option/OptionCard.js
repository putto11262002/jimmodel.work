import React from 'react'
import { Card, Dropdown, DropdownButton, ListGroup, Button } from 'react-bootstrap';
import { useJobContext } from '../../context/secured/jobContext';
import { useOptionModalContext } from '../../context/secured/optionModalContext';
import { useUpdateOptionModalContext } from '../../context/secured/updateOptionModalContext';
import { datetimeFormatter } from '../../helper/Formatter';
import ModelListGroupItem from '../model/ModelListGroupItem';
import ProfileImage from '../shared/image/ProfileImage';
export default function OptionCard({data}) {
  const {optionModalActions} = useOptionModalContext();
  const {updateOptionModalActions} = useUpdateOptionModalContext();
  const {jobActions} = useJobContext()
  async function handleDeleteOption(){
    try{
      await jobActions.deleteOption(data.job_id);
    }catch(err){
      console.error(err)
    }

  }

  async function confirmOption(){
    try{
      const updatedOption = await jobActions.updateOption(data.job_id, {...data, status: true})
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
              {datetimeFormatter(data.shooting_start) + " to " + datetimeFormatter(data.shooting_end)}
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Fitting date</div>
              {datetimeFormatter(data.fitting_date)}
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

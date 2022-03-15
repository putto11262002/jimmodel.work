import React from 'react'
import { useJobContext } from '../../context/secured/jobContext';
import { useOptionModalContext } from '../../context/secured/optionModalContext';
import { useUpdateOptionModalContext } from '../../context/secured/updateOptionModalContext';
import { Dropdown, ListGroup } from 'react-bootstrap';
import { datetimeFormatter } from '../../helper/Formatter';
export default function OptionListGroupItem({data}) {
    const {updateOptionModalActions} = useUpdateOptionModalContext();
    const {optionModalActions} = useOptionModalContext();
    const {jobActions} = useJobContext()

    async function handleDeleteOption(job_id) {
        try {
          const confirm = window.confirm("Are you sure you want to delete this option?")
          if(!confirm) return;
          await jobActions.deleteOption(job_id);
        } catch (err) {
          console.error(err);
        }
      }


  return (
    <ListGroup.Item
   
   
    className={`d-flex align-items-center flex-wrap rounded`}
    style={{ background:  data.User.colour}}
  >

<p className={`fs-xs w-100 m-0 `}>Booked at: {datetimeFormatter(data.createdAt)} by: {data.User.first_name + " " + data.User.last_name}</p>
    <p className={`p-0 my-0 d-inline text-dark fw-bold text-truncate`} style={{width: '90%'}}>{data.title} <span className='fw-normal'> {data.Models.length > 0 && " - "}  {data.Models.map((model, index) => `${(model.nickname === null ? model.first_name : model.nickname)} ${(index === data.Models.length - 1 ?  "" : ",")}`)}</span></p>

   
      <Dropdown className="ms-auto d-inline mx-2" align="end">
        <Dropdown.Toggle
          variant="white"
          className="m-0 p-0"
          id="dropdown-autoclose-true"
        >
          <i className={`bi bi-three-dots text-dark`}></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() =>
              updateOptionModalActions.setShow(data.job_id)
            }
          
          >
            Edit option
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => optionModalActions.setShow(data.job_id)}
       
          >
            View option
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() => handleDeleteOption(data.job_id)}
     
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
   
  </ListGroup.Item>
  )
}

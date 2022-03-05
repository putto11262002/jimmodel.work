
import React from 'react'
import { useJobContext } from '../../context/secured/jobContext';
import { useOptionModalContext } from '../../context/secured/optionModalContext';
import { useUpdateOptionModalContext } from '../../context/secured/updateOptionModalContext';
import { Dropdown, ListGroup } from 'react-bootstrap';

export default function FittingListGroupItem({data}) {
    const {updateOptionModalActions} = useUpdateOptionModalContext();
    const {optionModalActions} = useOptionModalContext();
    const {jobActions} = useJobContext()

    async function handleDeleteOption(job_id) {
        try {
          await jobActions.deleteOption(job_id);
        } catch (err) {
          console.error(err);
        }
      }
  return (
    <ListGroup.Item
    action
   
    className={`d-flex align-items-center ${data.status && "bg-dark"}`}
    style={{ background: !data.status && data.User.colour }}
  >
    <p className={`p-0 my-0 d-inline ${data.status ? 'text-white' : 'text-dark'}`}>{data.title}</p>

   
      <Dropdown className="ms-auto d-inline mx-2" align="end">
        <Dropdown.Toggle
          variant="white"
          className="m-0 p-0"
          id="dropdown-autoclose-true"
        >
          <i className={`bi bi-three-dots ${data.status ? 'text-white' : 'text-dark'}`}></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() =>
              updateOptionModalActions.setShow(data.job_id)
            }
            action
          >
            Edit job
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => optionModalActions.setShow(data.job_id)}
            action
          >
            View option
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() => handleDeleteOption(data.job_id)}
            action
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
   
  </ListGroup.Item>
  )
}

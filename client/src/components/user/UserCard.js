import React from 'react';
import {useUserContext} from '../../context/secured/userContext'
import { Card, Dropdown, ListGroup } from 'react-bootstrap'
export default function UserCard({data, onShowUpdateUserModal}) {
  const {userActions} = useUserContext()
  async function handleDeleteUser(){
    try{
      await userActions.deleteUser(data.user_id)
    }catch(err){
      console.error(err)
    }

  }
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between bg-white align-items-center">

        <h6 className="m-0 mx-2"><i className="bi bi-circle-fill me-3" style={{color: data.colour}}></i>{data.first_name + " " + data.last_name}</h6>
      

        <Dropdown className=" d-inline mx-2" align="end">
          <Dropdown.Toggle
            variant="white"
            className="m-0 p-0"
            id="dropdown-autoclose-true"
          >
            <i className="bi bi-three-dots"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
        
          <Dropdown.Item onClick={onShowUpdateUserModal}  >Edit User</Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteUser}  >Delete user</Dropdown.Item>
         
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <Card.Img
        variant="top"
        className="card-model-profile-img"
        src={`${process.env.REACT_APP_API_END_POINT}${data.profile_img}`}
      />
     <Card.Body>
     <ListGroup variant="flush">
          <ListGroup.Item className="px-0">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Email</div>
            {data.email}
            </div>
          </ListGroup.Item>
        
          </ListGroup>
     </Card.Body>
    </Card>
  )
}

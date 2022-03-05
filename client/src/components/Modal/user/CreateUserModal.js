import React, { useState } from "react";
import { Form, Modal, CloseButton, Button } from "react-bootstrap";
import { useUserContext } from "../../../context/secured/userContext";
import UploadImageInput from "../../createModel/UploadImageInput";
import Select from '../../shared/form/Select'
import Input from "../../shared/form/Input";
import { roleOptions } from "../../shared/form/options/userOptions";
export default function CreateUserModal({ onClose }) {
  const [inputData, setInputData] = useState({colour: '#000000'});
  const {userActions} = useUserContext()
  function handleInputChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  function handleFileInputChange(e) {
    setInputData((prevInputData) => {
     
      return { ...prevInputData, [e.target.name]: e.target.files[0] };
    });
  }

  async function handleSubmit(e){
      e.preventDefault()
      try{
         const createdUser =  await userActions.createUser(inputData);
         onClose()
      }catch(err){
          console.error(err)
      }
  }

  
  return (
    <Modal
      backdrop="static"
      backdropClassName="custom-blackdrop"
      className="custom-modal"
      show="true"
    >
      <Modal.Header>
        <Modal.Title>Create user</Modal.Title>
        <CloseButton onClick={onClose} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Input
            md="12"
            label="First name"
            name="first_name"
            value={inputData.first_name}
            onChange={handleInputChange}
          />

          <Input
            md="12"
            label="Last name"
            name="last_name"
            value={inputData.last_name}
            onChange={handleInputChange}
          />

          <Input
            md="12"
            label="Email"
            name="email"
            value={inputData.email}
            onChange={handleInputChange}
          />

          <Input
            md="12"
            label="Username"
            name="username"
            value={inputData.username}
            onChange={handleInputChange}
          />

          <Input
          type="password"
            md="12"
            label="Password"
            name="password"
            value={inputData.password}
            onChange={handleInputChange}
          />
          <Select
          mad="12"
          label="Role"
          name="role"
          value={inputData.role}
          onChange={handleInputChange}
          options={roleOptions}
          
          />

        

<UploadImageInput
            md="12"
            value={inputData.profile_img}
            onChange={handleFileInputChange}
            name="profile_img_file"
            label="Profile Image"
          />

<Input
            md="12"
            label="Colour"
            name="colour"
            value={inputData.colour}
            type="color"
            onChange={handleInputChange}
          />

        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button onClick={handleSubmit}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

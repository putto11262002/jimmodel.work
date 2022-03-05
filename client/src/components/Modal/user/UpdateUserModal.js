import React, { useEffect, useState } from "react";
import { Form, Modal, CloseButton, Button } from "react-bootstrap";
import { useUserContext } from "../../../context/secured/userContext";
import UploadImageInput from "../../user/UploadImageInput";
import Input from "../../shared/form/Input";
import Loader from "../../shared/Loader";
export default function UpdateUserModal({ onClose, user_id }) {
  const [inputData, setInputData] = useState({});
  const [loading, setLoading] = useState(true);
  const [resetPassword, setResetPassword] = useState(false)
  const {userActions} = useUserContext();
  const [showResetPasswordWarning, setShowResetPasswordWarning] = useState(false)

  

  useEffect(async() => {
      try{
          const fetchedUser = await userActions.getUser(user_id);
       
          setInputData(fetchedUser);
          setLoading(false)
      }catch(err){
          console.error(err)
      }

  }, []);
 
  function handleInputChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  function handleFileInputChange(e) {
    setInputData((prevInputData) => {
     
      return { ...prevInputData, [e.target.name]: e.target.files[0] };
    });
  }

  async function handleSubmit(e){
      e.preventDefault();
      setLoading(true)
      if(showResetPasswordWarning){
        return;
      }
      try{
        
         const updatedUser =  await userActions.updateUser(user_id, inputData);
         setLoading(false);
         onClose()

      }catch(err){
          console.error(err);
      }
   
  }

  useEffect(() => {
    if(resetPassword && (inputData.password === undefined || inputData.password === "")){
      setShowResetPasswordWarning(true)
    }
    if(resetPassword && (inputData.password !== undefined && inputData.password !== "")){
      setShowResetPasswordWarning(false)
    }
    if(!resetPassword){
      setShowResetPasswordWarning(false)
    }
    if(!resetPassword  && (inputData.password !== null)){
      setInputData({...inputData, password: null})
    }

  }, [resetPassword, inputData])

  
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
       {loading ? <Loader/> : (
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
           {!resetPassword && <Button onClick={() => setResetPassword(true)} variant="link" className="mx-0 px-0 mb-3">reset password</Button>}
           {resetPassword && <Button onClick={() => setResetPassword(false)} variant="link" className="mx-0 px-0 text-danger">Use same password</Button>}
          {resetPassword &&  <Input
            type="password"
              md="12"
              label="Password"
              name="password"
              value={inputData.password}
              onChange={handleInputChange}
            />}
            {showResetPasswordWarning && <p className="text-danger m-0 mb-3">Password cannot be empty</p>}
  
          
  
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
  
       )}
       
      </Modal.Body>
      <Modal.Footer>
          <Button onClick={handleSubmit}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

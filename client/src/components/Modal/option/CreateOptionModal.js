import { Modal, Button, CloseButton, Form } from "react-bootstrap";
import { useState } from "react";
import Input from "../../shared/form/Input";
import { useCreateOptionModalContext } from "../../../context/secured/createOptionModalContext";
import { useJobContext } from "../../../context/secured/jobContext";
import TalentInput from "../../shared/form/TalentInput";
import { useSessionContext } from "../../../context/unsecured/sessionContext";
import { validateOptionForm } from "../../../helper/formValidation/optionFormValidation";
import { useAlertContext } from "../../../context/unsecured/alertContext";
const initialInputData = {Models: [] }
export default function CreateOptionModal() {
  const { show, createOptionModalActions } = useCreateOptionModalContext();
  const { jobActions} = useJobContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {alertActions} = useAlertContext()
  const [inputData, setInputData] = useState(initialInputData);
  const {sessionActions} = useSessionContext()
  function handleInputChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

 

  async function handleSubmit(e){
    setLoading(true)
    e.preventDefault();
   
   try{
     const validatedInputData = await validateOptionForm(inputData);
     try{
      const createdOption = await jobActions.createOption(validatedInputData);
      setError(false);
      setLoading(false);
      createOptionModalActions.setHide()
    }catch(err){
      if (err.status === 401) {
        sessionActions.clearSession();
        return
       }
    
      console.error(err)
      setError(true);
      setLoading(false)

    }
   }catch(err){
     alertActions.setShow(err.errors[0], 'warning')
   }
    

  }

  function handleTalentInputChange(models){
    setInputData({...inputData, Models: models})
  }

  return (
  
      <Modal backdrop="static" backdropClassName="custom-blackdrop" className="custom-modal"  show="true">
        <Modal.Header>
          <Modal.Title>Create option</Modal.Title>
          <CloseButton onClick={() => createOptionModalActions.setHide()} />
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Input
              md="12"
              label="Title"
              name="title"
              value={inputData.title}
              onChange={handleInputChange}
            />

            <Input
              md="12"
              label="Client"
              name="client"
              value={inputData.client}
              onChange={handleInputChange}
            />

            <Input
              md="12"
              label="Client address"
              name="client_address"
              value={inputData.client_address}
              onChange={handleInputChange}
            />

            <TalentInput name="Models" placeholder="search models..." md="12" label="Talent booked" onChange={handleTalentInputChange} />

            <Input
              md="12"
              label="Media released"
              name="media_released"
              value={inputData.media_released}
              onChange={handleInputChange}
            />

            <Input
              md="12"
              label="Territories released"
              name="territories_released"
              value={inputData.territories_released}
              onChange={handleInputChange}
            />

            <Input
              type="datetime-local"
              md="12"
              label="Shooting start"
              name="shooting_start"
              value={inputData.shooting_start}
              onChange={handleInputChange}
            />

            <Input
              type="datetime-local"
              md="12"
              label="Shooting end"
              name="shooting_end"
              value={inputData.shooting_end}
              onChange={handleInputChange}
            />

<Input
              md="12"
              label="Working hour"
              name="working_hour"
              value={inputData.working_hour}
              onChange={handleInputChange}
            />

            <Input
              type="datetime-local"
              md="12"
              label="Fitting date"
              name="fitting_date"
              value={inputData.fitting_date}
              onChange={handleInputChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} variant="primary">Create</Button>
        </Modal.Footer>
      </Modal>

  );
}

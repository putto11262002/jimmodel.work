import TalentInput from "../../shared/form/TalentInput";
import { Modal, Button, CloseButton, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Input from "../../shared/form/Input";
import { htmlDateTimeFormatter } from "../../../helper/Formatter";

import Loader from "../../shared/Loader";
import { useJobContext } from "../../../context/secured/jobContext";
import { useUpdateJobModalContext } from "../../../context/secured/updateJobModalContext";
import { validateJobForm } from "../../../helper/formValidation/jobFormValidation";
import { useAlertContext } from "../../../context/unsecured/alertContext";
export default function UpdateJobModal() {
  const { show, updateJobModalActions, job_id } = useUpdateJobModalContext();
  const [inputData, setInputData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { jobActions } = useJobContext();
  const {alertActions} = useAlertContext()
  function handleInputChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  function handleTalentInputChange(models) {
    setInputData({ ...inputData, Models: models });
  }
  useEffect(async () => {
    try {
      setLoading(true);

      const fetchedOption = await jobActions.getJob(job_id);
      setInputData(fetchedOption);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }, []);

  async function handleSave() {
   try{
     setLoading(true)
     const validatedInputData = await validateJobForm(inputData);
     try{
       setLoading(true)
       console.log('t')
       const updatedJob = await jobActions.updateJob(job_id,{...inputData, JobDates: inputData.JobDates.map(jobDate => {
         return {...jobDate, date: new Date(jobDate.date)}
       })});
       setError(false);
       setLoading(false);
      updateJobModalActions.setHide()
     }catch(err){
       console.log(err)
       setError(true);
       setLoading(false)
     }
    
   }catch(err){
     console.log(err)
     setLoading(false)
     alertActions.setShow(err.errors[0], 'warning')
   }
  }

  return (
    <>
      <Modal
        backdrop="static"
        backdropClassName="custom-blackdrop"
        className="custom-modal"
        show="true"
      >
        <Modal.Header>
          <Modal.Title>Update job</Modal.Title>
          <CloseButton onClick={() => updateJobModalActions.setHide()} />
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Loader />
          ) : (
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

              <TalentInput
                name="Models"
                value={inputData.Models}
                placeholder="search models..."
                md="12"
                label="Talent booked"
                onChange={handleTalentInputChange}
              />

              <Input
                md="12"
                label="Person in charge"
                name="person_in_charge"
                value={inputData.person_in_charge}
                onChange={handleInputChange}
              />

              <Input
                md="12"
                label="Media released"
                name="media_released"
                value={inputData.media_released}
                onChange={handleInputChange}
              />

              <Input
                md="12"
                label="Period released"
                name="period_released"
                value={inputData.period_released}
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
                md="12"
                label="Working hour"
                name="working_hour"
                value={inputData.working_hour}
                onChange={handleInputChange}
              />

              <Input
                md="12"
                label="Venue of shoot"
                name="venue_of_shoot"
                value={inputData.venue_of_shoot}
                onChange={handleInputChange}
              />

              <Input
                md="12"
                label="Overtime per hour"
                name="overtime_per_hour"
                value={inputData.overtime_per_hour}
                onChange={handleInputChange}
              />

<Input
                md="12"
                label="Fee as agreed"
                name="fee_as_agreed"
                value={inputData.fee_as_agreed}
                onChange={handleInputChange}
              />

<Input
                md="12"
                label="Term of payment"
                name="terms_of_payment"
                value={inputData.terms_of_payment}
                onChange={handleInputChange}
              />

              <Input
                md="12"
                label="Cancellation fee"
                name="cancellation_fee"
                value={inputData.cancellation_fee}
                onChange={handleInputChange}
              />

              <Input
                md="12"
                label="Contract details"
                name="contract_details"
                value={inputData.contract_details}
                onChange={handleInputChange}
              />
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave} variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

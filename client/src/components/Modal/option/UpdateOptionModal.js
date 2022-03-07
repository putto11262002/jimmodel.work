import TalentInput from "../../shared/form/TalentInput";
import { Modal, Button, CloseButton, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Input from "../../shared/form/Input";
import DateInput from "../../shared/form/DateInput";
import { useUpdateOptionModalContext } from "../../../context/secured/updateOptionModalContext";
import Loader from "../../shared/Loader";
import { useJobContext } from "../../../context/secured/jobContext";
import { useSessionContext } from "../../../context/unsecured/sessionContext";
import { validateOptionForm } from "../../../helper/formValidation/optionFormValidation";
import { useAlertContext } from "../../../context/unsecured/alertContext";
export default function UpdateOptionModal() {
  const {show, updateOptionModalActions, job_id} = useUpdateOptionModalContext();
  const [inputData, setInputData] = useState({Models: Array(), JobDates: Array()});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {alertActions} = useAlertContext()
  const {jobActions} = useJobContext();
  const {sessionActions} = useSessionContext()
  function handleInputChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  function handleTalentInputChange(models){
    setInputData({...inputData, Models: models})
  }
  useEffect(async() => {
    try{
      setLoading(true);
      const fetchedOption = await jobActions.getOption(job_id);

      
      setInputData(fetchedOption);
      setLoading(false);
    
    }catch(err){
     
      console.error(err);
      setError(true)
    }

  }, []);
  
  async function handleSaveAsOption(){
   try{
    setLoading(true);

     const validatedInputData = await validateOptionForm(inputData);
     try{

     
      
      const updatedOption = await jobActions.updateOption(job_id, {...inputData, status: false, JobDates: inputData.JobDates.map(jobDate => {
        return {...jobDate, date: new Date(jobDate.date)}
      })});
    
      setInputData(updatedOption);
      setLoading(false);
      updateOptionModalActions.setHide();
    }catch(err){
     setLoading(false);
      console.error(err);
      setError(true)
    }
   }catch(err){
     alertActions.setShow(err.errors[0], 'warning');
   }

  }

  async function handleSaveAsJob(){
    try{
      setLoading(true);
       const validatedInputData = await validateOptionForm(inputData);
       try{
        
        
        const updatedOption = await jobActions.updateOption(job_id, {...inputData, status: true, JobDates: inputData.JobDates.map(jobDate => {
          return {...jobDate, date: new Date(jobDate.date)}
        })});
        setInputData(updatedOption);
        setLoading(false);
        updateOptionModalActions.setHide()
      }catch(err){
       
        console.error(err);
        setError(true)
      }
     }catch(err){
       alertActions.setShow(err.errors[0], 'warning');
     }

  }

  

  function handleDateInputChange(newJobDates, type) {
    setInputData({
      ...inputData,
      JobDates: [
        ...inputData.JobDates.filter((jobDate) => jobDate.type !== type),
        ...newJobDates.map(jobDate => {
          return {date: jobDate, type}
        }),
      ],
    });
  }

  return (
    <>
      <Modal  backdrop="static" backdropClassName="custom-blackdrop" className="custom-modal"  show="true">
        <Modal.Header>
          <Modal.Title>Update option</Modal.Title>
          <CloseButton onClick={() =>updateOptionModalActions.setHide()} />
        </Modal.Header>
        <Modal.Body>
       { loading ? <Loader/> :   <Form>
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

<DateInput
            value={inputData.JobDates.filter(
              (jobDate) => jobDate.type === "fitting_date"
            ).map(jobDate => jobDate.date)}
            onChange={(newJobDates) =>
              handleDateInputChange(newJobDates, "fitting_date")
            }
            label="Fitting date"
            md="12"
          />


<DateInput
            value={inputData.JobDates.filter(
              (jobDate) => jobDate.type === "rehearsal_date"
            ).map(jobDate => jobDate.date)}
            onChange={(newJobDates) =>
              handleDateInputChange(newJobDates, "rehearsal_date")
            }
            label="Rehearsal date"
            md="12"
          />
                <DateInput
            value={inputData.JobDates.filter(
              (jobDate) => jobDate.type === "shooting_date"
            ).map(jobDate => jobDate.date)}
            onChange={(newJobDates) =>
              handleDateInputChange(newJobDates, "shooting_date")
            }
            label="Shooting date"
            md="12"
          />

<DateInput
            value={inputData.JobDates.filter(
              (jobDate) => jobDate.type === "final_meeting_date"
            ).map(jobDate => jobDate.date)}
            onChange={(newJobDates) =>
              handleDateInputChange(newJobDates, "final_meeting_date")
            }
            label="Final meeting date"
            md="12"
          />

            <TalentInput name="Models" value={inputData.Models} placeholder="search models..." md="12" label="Talent booked" onChange={handleTalentInputChange} />

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
              md="12"
              label="Working hour"
              name="working_hour"
              value={inputData.working_hour}
              onChange={handleInputChange}
            />



     
          </Form>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSaveAsOption} variant="primary">Save as option</Button>
          <Button onClick={handleSaveAsJob} variant="primary">Confirm and save as job</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


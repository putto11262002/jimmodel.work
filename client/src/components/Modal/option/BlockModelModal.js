
import React, { useState } from 'react'
import { Modal, CloseButton, Form, Button } from 'react-bootstrap'
import { useBlockModelModalContext } from '../../../context/secured/BlockModelModalContext'
import { useJobContext } from '../../../context/secured/jobContext';
import { useSessionContext } from '../../../context/unsecured/sessionContext';
import DateInput from '../../shared/form/DateInput';
import TalentInput from '../../shared/form/TalentInput';
import Loader from '../../shared/Loader';
import { validateBlockModelForm } from '../../../helper/formValidation/blockModelFormValidation';
import { useAlertContext } from '../../../context/unsecured/alertContext';
const initialInputData = {Models: [], title: "Not available", JobDates: []};

export default function BlockModelModal() {
    const {blockModelModalActions} = useBlockModelModalContext();
    const [inputData, setInputData] = useState(initialInputData);
    const {jobActions} = useJobContext();
    const [loading, setLoading] = useState(false);
    const {sessionActions} = useSessionContext();
    const {alertActions}  = useAlertContext()
    function handleTalentInputChange(models) {
        setInputData({ ...inputData, Models: models });
      }

      function handleDateInputChange(newJobDates){
          setInputData({...inputData, JobDates: newJobDates.map(jobDate => {
              return {date: new Date(jobDate), type: "block_model_date"}
          })})
      }

     async function handleSubmit(e){
          e.preventDefault()
          setLoading(true)
     try{
         const validatedInputData = await validateBlockModelForm(inputData);
         try {
            const createdOption = await jobActions.createOption(inputData);
            setInputData(createdOption)
         
            setLoading(false)
            blockModelModalActions.setHide();
          } catch (err) {
            if (err.status === 401) {
              sessionActions.clearSession();
              return;
            }
    
            console.error(err);
          
            setLoading(false);
          }
     }catch(err){
         setLoading(false)
         alertActions.setShow(err.errors[0], "warning")
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
      <Modal.Title>Block model</Modal.Title>
      <CloseButton onClick={() => blockModelModalActions.setHide()} />
    </Modal.Header>
 <Modal.Body>
 {loading ? <Loader/> : <Form>

<DateInput
            value={inputData.JobDates}
            onChange={(newJobDates) =>
              handleDateInputChange(newJobDates)
            }
            label="Block model date"
            md="12"
          />

 <TalentInput
            name="Models"
            placeholder="search models..."
            md="12"
            label="Talent booked"
            onChange={handleTalentInputChange}
         
          />

        </Form>}
        <Modal.Footer>
            <Button onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
 </Modal.Body>
    </Modal>
  )
}

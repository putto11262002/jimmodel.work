import { Modal, Button, CloseButton, Form } from "react-bootstrap";
import { useState } from "react";
import Input from "../../shared/form/Input";
import { useCreateOptionModalContext } from "../../../context/secured/createOptionModalContext";
import { useJobContext } from "../../../context/secured/jobContext";
import TalentInput from "../../shared/form/TalentInput";
import { useSessionContext } from "../../../context/unsecured/sessionContext";
import { validateOptionForm } from "../../../helper/formValidation/optionFormValidation";
import { useAlertContext } from "../../../context/unsecured/alertContext";
import DateInput from "../../shared/form/DateInput";
import Loader from "../../shared/Loader";
const initialInputData = { Models: [], JobDates: [] };
export default function CreateOptionModal() {
  const { show, createOptionModalActions } = useCreateOptionModalContext();
  const { jobActions } = useJobContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { alertActions } = useAlertContext();
  const [inputData, setInputData] = useState(initialInputData);
  const { sessionActions } = useSessionContext();
  function handleInputChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      const validatedInputData = await validateOptionForm(inputData);
      try {
        const createdOption = await jobActions.createOption(inputData);
        setInputData(createdOption)
        setError(false);
        setLoading(false)
        createOptionModalActions.setHide();
      } catch (err) {
        if (err.status === 401) {
          sessionActions.clearSession();
          return;
        }

        console.error(err);
        setError(true);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false)
     
      alertActions.setShow(err.errors[0], "warning");
    }
  }

  function handleTalentInputChange(models) {
    setInputData({ ...inputData, Models: models });
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
    <Modal
      backdrop="static"
      backdropClassName="custom-blackdrop"
      className="custom-modal"
      show="true"
    >
      <Modal.Header>
        <Modal.Title>Create option</Modal.Title>
        <CloseButton onClick={() => createOptionModalActions.setHide()} />
      </Modal.Header>
     {loading ? <Loader/> : <Modal.Body>
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

<DateInput
            value={inputData.JobDates.filter(
              (jobDate) => jobDate.type === "fitting_date"
            )}
            onChange={(newJobDates) =>
              handleDateInputChange(newJobDates, "fitting_date")
            }
            label="Fitting date"
            md="12"
          />


<DateInput
            value={inputData.JobDates.filter(
              (jobDate) => jobDate.type === "rehearsal_date"
            )}
            onChange={(newJobDates) =>
              handleDateInputChange(newJobDates, "rehearsal_date")
            }
            label="Rehearsal date"
            md="12"
          />
                <DateInput
            value={inputData.JobDates.filter(
              (jobDate) => jobDate.type === "shooting_date"
            )}
            onChange={(newJobDates) =>
              handleDateInputChange(newJobDates, "shooting_date")
            }
            label="Shooting date"
            md="12"
          />

<DateInput
            value={inputData.JobDates.filter(
              (jobDate) => jobDate.type === "final_meeting_date"
            )}
            onChange={(newJobDates) =>
              handleDateInputChange(newJobDates, "final_meeting_date")
            }
            label="Final meeting date"
            md="12"
          />

          <TalentInput
            name="Models"
            placeholder="search models..."
            md="12"
            label="Talent booked"
            onChange={handleTalentInputChange}
            date={inputData.JobDates.filter(jobDate => jobDate.type === "shooting_date").length > 0 ? inputData.JobDates.filter(jobDate => jobDate.type === "shooting_date").map(jobDate => jobDate.date): null}
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

    







       

         

        
        </Form>
      </Modal.Body>}
      <Modal.Footer>
        <Button onClick={handleSubmit} variant="primary">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

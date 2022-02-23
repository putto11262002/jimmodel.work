import { datetimeFormatter } from "../../../helper/Formatter";
import { useEffect, useState } from "react";
import ProfileImage from "../../shared/image/ProfileImage";
import { Modal, ListGroup, CloseButton } from "react-bootstrap";
import { useOptionModalContext } from "../../../context/secured/optionModalContext";
import Loader from "../../shared/Loader";
import { useJobContext } from "../../../context/secured/jobContext";
import { useSessionContext } from "../../../context/unsecured/sessionContext";

export default function OptionModal() {
  const [option, setOption] = useState({});
  const { optionModalActions, job_id } = useOptionModalContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { jobActions } = useJobContext();
  const {sessionActions} = useSessionContext()

  useEffect(async () => {
    try {
      setLoading(true);
      const fetchedOption = await jobActions.getOption(job_id);
      setOption(fetchedOption);
      setLoading(false);
    } catch (err) {
      if (err.status === 401) {
        sessionActions.clearSession();
        return;
       }
    
      console.error(err);
      setError(true);
    }
  }, []);
  
  return (
    <Modal
      backdrop="static"
      backdropClassName="custom-blackdrop"
      className="custom-modal"
      show="true"
    >
      <Modal.Header>
        <Modal.Title>{option.title}</Modal.Title>
        <CloseButton onClick={() => optionModalActions.setHide()} />
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Loader />
        ) : (
          <ListGroup variant="flush">
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Shooting Schedule</div>
                {datetimeFormatter(option.shooting_start) +
                  " to " +
                  datetimeFormatter(option.shooting_end)}
              </div>
            </ListGroup.Item>
          
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Fitting date</div>
                {datetimeFormatter(option.fitting_date)}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Working hour</div>
                {option.working_hour}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Talent booked</div>
                <ListGroup className="my-2">
                  {option.Models.map((model, index) => {
                    return (
                      <ListGroup.Item key={index} action>
                        <ProfileImage
                          width={1.5}
                          height={1.5}
                          src={
                            process.env.REACT_APP_API_END_POINT +
                            model.profile_img_1
                          }
                        />
                        <span className="mx-3 my-0">
                          {model.first_name + " " + model.last_name}
                        </span>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Client</div>
                {option.client}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Client address</div>
                {option.client_address}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Media released</div>
                {option.media_released}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Territories released</div>
                {option.territories_released}
              </div>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Modal.Body>
    </Modal>
  );
}

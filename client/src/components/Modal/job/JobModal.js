import { dateFormatter, datetimeFormatter } from "../../../helper/Formatter";
import { useEffect, useState } from "react";
import ProfileImage from "../../shared/image/ProfileImage";
import { Modal, ListGroup, CloseButton } from "react-bootstrap";
import Loader from "../../shared/Loader";
import { useJobContext } from "../../../context/secured/jobContext";
import { useJobModalContext } from "../../../context/secured/jobModalContext";

export default function JobModal() {
  const [job, setJob] = useState({});
  const { jobModalActions, job_id } = useJobModalContext()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { jobActions } = useJobContext();

  useEffect(async () => {
    try {
      setLoading(true);
      const fetchedJob = await jobActions.getJob(job_id);
      setJob(fetchedJob);
      setLoading(false)
    } catch (err) {
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
        <Modal.Title>{job.title}</Modal.Title>
        <CloseButton onClick={() => jobModalActions.setHide()} />
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Loader />
        ) : (
          <ListGroup variant="flush">
                <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Client</div>
                {job.client}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Client address</div>
                {job.client_address}
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Booked by</div>
                <ListGroup className="my-2">
                  <ListGroup.Item action >
                  <ProfileImage
                          width={1.5}
                          height={1.5}
                          src={
                            process.env.REACT_APP_API_END_POINT +
                            job.User.profile_img
                          }
                        />
                          <span className="ms-3 my-0">
                          {job.User.first_name + " " + job.User.last_name}
                        </span>

                  </ListGroup.Item>
                </ListGroup>
              
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Talent booked</div>
                <ListGroup className="my-2 mx-0">
                  {job.Models.map((model, index) => {
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
                        <span className="ms-3 my-0">
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
                <div className="fw-bold">Person in charge</div>
                {job.person_in_charge}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Media released</div>
                {job.media_released}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Period released</div>
                {job.period_released}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Territories released</div>
                {job.territories_released}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Shooting Schedule</div>
                {datetimeFormatter(job.shooting_start) +
                  " to " +
                  datetimeFormatter(job.shooting_end)}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Fitting date</div>
                {datetimeFormatter(job.fitting_date)}
              </div>
            </ListGroup.Item>
         
          
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Working hour</div>
                {job.working_hour}
              </div>
            </ListGroup.Item>


            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Venue of shoot</div>
                {job.venue_of_shoot}
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Overtime per hour</div>
                {job.overtime_per_hour}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Terms of payment</div>
                {job.terms_of_payment}
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Fee as agreed</div>
                {job.fee_as_agreed}
              </div>
            </ListGroup.Item>

          

            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Cancellation fee</div>
                {job.cancellation_fee}
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="px-0">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Contract details</div>
                {job.contract_details}
              </div>
            </ListGroup.Item>


         
          </ListGroup>
        )}
      </Modal.Body>
    </Modal>
  );
}

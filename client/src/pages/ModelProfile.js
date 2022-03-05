import { useEffect, useState } from "react";
import { Row, Col, ListGroup, Accordion, Image, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ExperienceCard from "../components/experience/ExperienceCard";
import JobCard from "../components/job/JobCard";
import JobListGroupItem from "../components/job/JobListGroupItem";
import OptionListGroupItem from "../components/option/OptionListGroupItem";
import Error from "../components/shared/Error";
import Loader from "../components/shared/Loader";
import PageWrapper from "../components/shared/page/PageWrapper";
import { useJobContext } from "../context/secured/jobContext";
import { useModelContext } from "../context/secured/modelContext";
import { useSessionContext } from "../context/unsecured/sessionContext";
import { textFormatter } from "../helper/Formatter";
import docService from "../services/doc.service";
export default function ModelProfile() {
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { jobActions, infiniteScrolling: jobInfiniteScrolling } =
    useJobContext();
  const param = useParams();
  const { modelActions, infiniteScrolling: modelInfiniteScrolling } =
    useModelContext();
  const navigate = useNavigate();
  const { sessionActions, user } = useSessionContext();

  useEffect(async () => {
    if (!modelInfiniteScrolling.loading && !jobInfiniteScrolling.loading) {
      try {
        setLoading(true);
        const fetchedModel = await modelActions.getModel(param.model_id);
        for(let i = 0; i < fetchedModel.Jobs.length; i++){
          const fetchedJob = fetchedModel.Jobs[i].status ? await jobActions.getJob(fetchedModel.Jobs[i].job_id) : await jobActions.getOption(fetchedModel.Jobs[i].job_id);
          fetchedModel.Jobs[i] = fetchedJob
        }

        setModel(fetchedModel);

        setLoading(false);
      } catch (e) {
        console.error(e);
        setError(true);
        setLoading(false);
      }
    }
  }, [modelInfiniteScrolling.loading, jobInfiniteScrolling.loading]);

  async function getModelProfile() {
    try {
      const res = await docService.getModelProfile(model.model_id);
      const resData = await res.data;
      const file = new Blob([resData], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (err) {
      if (err.response.status === 401) {
        sessionActions.clearSession();
        return;
      }
      console.error(err);
    }
  }

  async function handleDeleteModel() {
    try {
      await modelActions.deleteModel(model.model_id);
      navigate("/model");
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    );
  } else if (!loading && !error) {
    return (
      <PageWrapper>
        <div className="d-flex justify-content-center">
          <Row
            className="justify-content-center g-3"
            style={{ maxWidth: "40rem" }}
          >
            <h4 className="text-center">
               { model.first_name + " " + model.last_name}
            </h4>
            <Col
              xs="12"
              className="d-flex align-items-ccenter justify-content-center gap-4 mb-3"
            >
              <Button
                onClick={() => navigate(`/edit-model/${model.model_id}`)}
                variant="light"
                className=" rounded-circle"
              >
                <i className="bi bi-pencil-square text-primary"></i>
              </Button>
              <Button
                onClick={getModelProfile}
                variant="light"
                className=" rounded-circle"
              >
                <i className="bi bi-file-earmark-arrow-down text-primary"></i>
              </Button>
              {(user.role === "admin" || user.role === "root") &&
                !model.approved && (
                  <Button
                    onClick={handleDeleteModel}
                    variant="light"
                    className=" rounded-circle"
                  >
                    <i className="bi bi-trash3-fill text-danger"></i>
                  </Button>
                )}
            </Col>
            <Col xs="12">
              <img
                src={`${process.env.REACT_APP_API_END_POINT}${model.profile_img_1}`}
                className="w-100"
                style={{ objectFit: "cover", height: "15rem" }}
              />
            </Col>
            <Col xs="12">
              <Accordion className="w-100 p-0 m-0" defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Personal Details</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Date of birth</div>
                           {textFormatter( model.date_of_birth)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Gender</div>
                           {textFormatter( model.gender)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Nationality</div>
                           {textFormatter( model.nationality)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Ethnicity</div>
                           {textFormatter( model.ethnicity)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Country of residence</div>
                           {textFormatter( model.country_of_residence)}
                        </div>
                      </ListGroup.Item>{" "}
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Spoken language</div>
                           {textFormatter( model.spoken_language)}
                        </div>
                      </ListGroup.Item>{" "}
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Passport number</div>
                           {textFormatter( model.passport_no)}
                        </div>
                      </ListGroup.Item>{" "}
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">ID card</div>
                           {textFormatter( model.id_card)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Tax ID</div>
                           {textFormatter( model.tax_id)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Address</div>
                           {textFormatter( model.address) +
                            ", " +
                            textFormatter(model.city) +
                            ", " +
                            textFormatter(model.zip_code) +
                            ", " +
                            textFormatter(model.country)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Speical talents</div>
                           {textFormatter( model.talent)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Medical background</div>
                           {textFormatter( model.medical_background)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Tattoo or scar</div>
                           { model.tattoo_scar ? "Yes" : "No"}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">In town</div>
                           { model.in_town ? "Yes" : "No"}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Underware shooting</div>
                           { model.underware_shooting ? "Yes" : "No"}
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Contact details</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Email</div>
                          {textFormatter(model.email)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Phone number</div>
                          {textFormatter(model.phone_number)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">line_id</div>
                          {textFormatter(model.line_id)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">WhatsApp</div>
                          {textFormatter(model.whatsApp)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">WeChat</div>
                          {textFormatter(model.weChat)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Instagram</div>
                          {textFormatter(model.instagram)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Facebook</div>
                          {textFormatter(model.facebook)}
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Emergency contact</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Name</div>
                           {textFormatter( model.emergency_contact_name)}
                        </div>
                      </ListGroup.Item>
                    
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Relationship</div>
                           {textFormatter( model.emergency_contact_relationship)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Details</div>
                           {textFormatter( model.emergency_contact_details)}
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Measurements</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Height</div>
                           {textFormatter( model.Measurement.height)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Weight</div>
                           {textFormatter( model.Measurement.weight)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Chest/Bust/Cup</div>
                           {textFormatter( model.Measurement.chest_bust_cup)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Collar</div>
                           {textFormatter( model.Measurement.collar)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Around armpit</div>
                           {textFormatter( model.Measurement.around_armpit)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Around thick to ankle</div>
                           {textFormatter( model.Measurement.around_thick_to_ankle)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Around arm to wrist</div>
                           {textFormatter( model.Measurement.around_arm_to_wrist1) +
                            "/" +
                            textFormatter(model.Measurement.around_arm_to_wrist2) +
                            "/" +
                           textFormatter(model.Measurement.around_arm_to_wrist3)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Arm length</div>
                           {textFormatter( model.Measurement.arm_length1) +
                            "/" +
                           textFormatter( model.Measurement.arm_length2)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Trousers length</div>
                           {textFormatter( model.Measurement.trousers_length)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Chest height</div>
                           {textFormatter( model.Measurement.chest_height)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Chest width</div>
                           {textFormatter( model.Measurement.chest_width)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Waist</div>
                           {textFormatter( model.Measurement.waist)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Hips</div>
                           {textFormatter( model.Measurement.hips)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Shoulder</div>
                           {textFormatter( model.Measurement.shoulder)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Front shoulder</div>
                           {textFormatter( model.Measurement.front_shoulder)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Front length</div>
                           {textFormatter( model.Measurement.front_length)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Back shoulder</div>
                           {textFormatter( model.Measurement.back_shoulder)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Back length</div>
                           {textFormatter( model.Measurement.back_length)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Crotch</div>
                           {textFormatter( model.Measurement.crotch)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Suit/Dress</div>
                           {textFormatter( model.Measurement.suit_dress)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Bra size</div>
                           {textFormatter( model.Measurement.bra_size)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Shoes size</div>
                           {textFormatter( model.Measurement.shoes_size)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Hair colour</div>
                           {textFormatter( model.Measurement.hair_colour)}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">Eye colour</div>
                           {textFormatter( model.Measurement.eye_colour)}
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Images</Accordion.Header>
                  <Accordion.Body>
                    <Image
                      className="my-3"
                      fluid={true}
                      src={
                        process.env.REACT_APP_API_END_POINT +
                        model.profile_img_2
                      }
                    />

                    <Image
                      className="my-3"
                      fluid={true}
                      src={
                        process.env.REACT_APP_API_END_POINT +
                        model.profile_img_3
                      }
                    />

                    <Image
                      className="my-3"
                      fluid={true}
                      src={
                        process.env.REACT_APP_API_END_POINT +
                        model.profile_img_4
                      }
                    />

                    <Image
                      className="my-3"
                      fluid={true}
                      src={
                        process.env.REACT_APP_API_END_POINT +
                        model.profile_img_5
                      }
                    />

                    <Image
                      className="my-3"
                      fluid={true}
                      src={
                        process.env.REACT_APP_API_END_POINT +
                        model.profile_img_6
                      }
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>Jobs</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup>
                       { model.Jobs.map((job, index) => {
                        if (job.status) {
                          return <JobListGroupItem key={index} data={job} />;
                        } else {
                          return <OptionListGroupItem key={index} data={job} />;
                        }
                      })}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                  <Accordion.Header>Experiences</Accordion.Header>
                  <Accordion.Body>
                    <Row className="g-3">
                       { model.Experiences.map((experience, index) => {
                        return (
                          <Col key={index} xs="12" md="6">
                            <ExperienceCard data={experience} />
                          </Col>
                        );
                      })}
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </div>
      </PageWrapper>
    );
  } else {
    return (
      <PageWrapper>
        <Error />
      </PageWrapper>
    );
  }
}

import { Card, ListGroup, Dropdown,DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import docService from "../../services/doc.service";
import { useAlertContext } from "../../context/unsecured/alertContext";
import { useModelContext } from "../../context/secured/modelContext";
import { textFormatter } from "../../helper/Formatter";
export default function ModelCard({ data }) {
  const navigate = useNavigate();
  const {alertActions} = useAlertContext();
  const {modelActions} = useModelContext()
  async function getModelProfile(){
    try{
      const res = await docService.getModelProfile(data.model_id);
      const resData = await res.data;
      const file = new Blob(
        [resData],
        {type: 'application/pdf'}
      );
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL)
    }catch(err){
      console.error(err)
    }
  }



  

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between bg-white align-items-center">
        <h6 className="m-0 mx-2">{data.first_name + " " + data.last_name}</h6>
      

        <Dropdown className=" d-inline mx-2" align="end">
          <Dropdown.Toggle
            variant="white"
            className="m-0 p-0"
            id="dropdown-autoclose-true"
            title=""
          >
            <i className="bi bi-three-dots"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
          <Dropdown.Item onClick={() => navigate(`/model/${data.model_id}`)} >View model</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate(`/edit-model/${data.model_id}`)}>Edit model</Dropdown.Item>
         
          <Dropdown.Item  onClick={getModelProfile} >Model Profile PDF</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <Card.Img
        variant="top"
        className="card-model-profile-img"
        src={`${process.env.REACT_APP_API_END_POINT}${data.profile_img_1}`}
      />
     <Card.Body>
     <ListGroup variant="flush">
          <ListGroup.Item className="px-0">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Email</div>
            {textFormatter(data.email)}
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="px-0">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Phone number</div>
            {textFormatter(data.phone_number)}
            </div>
          </ListGroup.Item>
          </ListGroup>
     </Card.Body>
    </Card>
  );
}

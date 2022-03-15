import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useModelContext } from "../../../context/secured/modelContext";
import { useAlertContext } from "../../../context/unsecured/alertContext";
import { validateCreateModelForm } from "../../../helper/formValidation/modelFormValidation";
import useSearchModel from "../../../hooks/useSearchModel";
import JobListGroupItem from "../../job/JobListGroupItem";
import OptionListGroupItem from "../../option/OptionListGroupItem";
import ProfileImage from "../image/ProfileImage";
import Loader from "../Loader";
export default function TalentInput({
  md,
  value,
  name,
  onChange,
  placeholder,
  label,
  date=null
}) {
  const {modelActions} = useModelContext()
  const [searchTerm, setSearchTerm] = useState("");
  const {alertActions } = useAlertContext();
  const [models, setModels] = useState(!Array.isArray(value) ? [] : value);
  const [inputData, setInputData] = useState({Measurement: {}, Experiences: Array(), approved: true})
  function handleInputChange(e) {
    setSearchTerm(e.target.value);
  }

  async function addNewModel(e){
    e.preventDefault()
   try{
     const validatedInputData = await validateCreateModelForm(inputData);
     try{
      
      const createdModel = await modelActions.createModel(validatedInputData);
      addModel(createdModel);
     
     

    }catch(err){
      console.error(err)
    }
   }catch(err){
     alertActions.setShow(err.errors[0], 'warning');
   }
  }

  function addModel(newModel) {
    for (let model of models) {
      if (model.model_id === newModel) {
        alertActions.setShow("Talent has already been added", "warning");
        return;
      }
    }
    onChange([...models, newModel]);
    setModels([...models, newModel]);
  }

  function handleRemoveModel(model_id){
    const tempModels = models;
    const updatedModels = tempModels.filter(model => model.model_id !== model_id);
    onChange(updatedModels);
    setModels(updatedModels)
  }

  function handleSelectModel(newModel) {
    setSearchTerm("");
    addModel(newModel);
  }



  const { searchResults, loading, error } = useSearchModel(searchTerm, date);
 
  return (
    <Container className="p-0 m-0 mb-2" liquid="true">
      <Form.Group
        className={`mb-1 col-12 col-md-${md} position-relative`}
        style={{ overFlow: "auto" }}
      >
        <p className="mb-0">{label}</p>
        <p className="text-secondary mb-2 mt-2">Search talent</p>
        <Form.Control
          name={name}
          onChange={handleInputChange}
          placeholder={placeholder}
          value={searchTerm}
        />
        <SearchResults
          loading={loading}
          searchResults={searchResults}
          onSelect={handleSelectModel}
        />
      </Form.Group>
      <p className="text-secondary mb-2 mt-3">Add new model</p>
      <Row>
        <FormGroup className="col-6">
          <Form.Control onChange={(e) => setInputData({...inputData, first_name: e.target.value})} placeholder="first name" />
        </FormGroup>
        <FormGroup className="col-6">
          <Form.Control placeholder="last name" onChange={(e) => setInputData({...inputData, last_name: e.target.value})} />
        </FormGroup>
      <Col className="" xs="6"> <Button onClick={addNewModel} className="px-0 btn" variant="link">Add talent</Button></Col>
      </Row>
      <AddedModelList models={models} onRemoveTalent={handleRemoveModel} />
    </Container>
  );
}

function AddedModelList({ models , onRemoveTalent}) {
  return (
    <ListGroup>
      {models.map((model, index) => {
        return (
          <ListGroup.Item className="d-flex align-items-center" key={index}>
            <ProfileImage
              width={1.5}
              height={1.5}
              src={process.env.REACT_APP_API_END_POINT + model.profile_img_1}
            />
            <p className="m-0 p-0 ms-2 d-inline">
              {model.first_name + " " + model.last_name}
            </p>
          <span className="ms-auto">  <i onClick={() => onRemoveTalent(model.model_id)} className="bi bi-x"></i></span>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

function SearchResults({ searchResults, onSelect, loading }) {
  return (
    <ListGroup className="position-absolute w-100 shadow" style={{zIndex: 20}}>
      {loading ? (
        <ListGroup.Item>
          {" "}
          <Loader />
        </ListGroup.Item>
      ) : (
        searchResults.length > 0 &&
        searchResults.map((model, index) => {
          return (
            <ListGroup.Item
           
            
             
              key={index}
             
            >
              <img
                className="rounded-circle"
                style={{ height: "1.5rem", width: "1.5rem" }}
                src={process.env.REACT_APP_API_END_POINT + model.profile_img_1}
              />
              <p className="mx-3 d-inline"  onClick={(e) => {
                e.preventDefault();
                onSelect(model);
              }}>
                {model.first_name + " " + model.last_name} {model.nickname !== null && "(" + model.nickname  + ")"}
              </p>
            { model.JobsOnTargetDate !== undefined && (model.JobsOnTargetDate.length > 0 &&  <ListGroup className="w-100 mt-3 mb-2">
                {model.JobsOnTargetDate.map((job, index) => {
               
                  if(job.status){
                    return <JobListGroupItem data={job} key={index}/>
                   
                  }else{
                    return  <OptionListGroupItem data={job} key={index}/>
                    
                    
                  }
                })}

              </ListGroup>)}
            </ListGroup.Item>
          );
        })
      )}
    </ListGroup>
  );
}

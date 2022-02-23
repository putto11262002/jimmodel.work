import { useState } from "react";
import { Container, Form, ListGroup } from "react-bootstrap";
import { useAlertContext } from "../../../context/unsecured/alertContext";
import useSearchModel from "../../../hooks/useSearchModel";
import ProfileImage from "../image/ProfileImage";
import Loader from "../Loader";
export default function TalentInput({
  md,
  value,
  name,
  onChange,
  placeholder,
  label,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const {_, alertActions} = useAlertContext()
  const [models, setModels] = useState(!Array.isArray(value)  ? [] : value)
  function handleInputChange(e) {
    setSearchTerm(e.target.value);
  }

  function addModel(newModel){
      for(let model of models){
          if(model.model_id === newModel){
              alertActions.setShow('Talent has already been added', 'warning')
              return;

          }
      }
      onChange([...models, newModel].map((model) => model.model_id))
      setModels([...models, newModel]);
      
  }

  function handleSelectModel(newModel){
      setSearchTerm("")
      addModel(newModel);

  }

  const { searchResults, loading, error } = useSearchModel(searchTerm);
  return (
    <Container className="p-0 m-0 mb-2" liquid="true" >
      <Form.Group className={`mb-3 col-12 col-md-${md} position-relative`} style={{overFlow: 'auto'}}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          name={name}
          onChange={handleInputChange}
          placeholder={placeholder}
          value={searchTerm}
        />
         <SearchResults loading={loading} searchResults={searchResults} onSelect={handleSelectModel}/>
       
      </Form.Group>
      <AddedModelList models={models}/>
     
    </Container>
  );
}

function AddedModelList({models}){
    return (
        <ListGroup  >
            {models.map((model, index) => {
                return (

                    <ListGroup.Item style={{zIndex: '10'}} key={index} action><ProfileImage width={1.5} height={1.5} src={process.env.REACT_APP_API_END_POINT + model.profile_img_1}/><p className="mx-3 d-inline">{model.first_name 
                        + " " + model.last_name}</p></ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}

function SearchResults({ searchResults, onSelect, loading }) {
   
  return (
    <ListGroup className="position-absolute w-100">
      
      {loading ? <ListGroup.Item> <Loader/></ListGroup.Item>: searchResults.length > 0 && searchResults.map((model, index) => {
        return   <ListGroup.Item style={{zIndex: '12'}}  onClick={(e) => {
            e.preventDefault();
            onSelect(model)
        }} key={index} action><img className="rounded-circle" style={{height: '1.5rem', width: '1.5rem'}} src={process.env.REACT_APP_API_END_POINT + model.profile_img_1}/><p className="mx-3 d-inline">{model.first_name 
          + " " + model.last_name}</p></ListGroup.Item>
      })}
    </ListGroup>
  );
}

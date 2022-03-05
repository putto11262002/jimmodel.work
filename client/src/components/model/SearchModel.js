import { useState, useEffect } from "react";
import { Container, FormControl, ListGroup, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "../../context/unsecured/sessionContext";
import useSearchModel from "../../hooks/useSearchModel";
import ProfileImage from "../shared/image/ProfileImage";

export default function SearchModel() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  const { searchResults, loading, error } = useSearchModel(searchTerm);
  const {sessionActions} = useSessionContext()
  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
  }
 
 
  return (
    <Container className="position-relative w-100 p-0  " fluid>
      <FormControl
        onChange={handleSearchTermChange}
        type="text"
        placeholder="search model..."
      />
      <ListGroup className="position-absolute w-100 shadow">
        {searchResults.map((model, index) => {
          return (
            <ListGroup.Item
            action
              key={index}
              className={`d-flex align-items-center `}
            >
   
             <ProfileImage
                src={process.env.REACT_APP_API_END_POINT + model.profile_img_1}
                width={1.5}
                height={1.5}
              />
              <p className="p-0 my-0 d-inline ms-2">
                {model.first_name + " " + model.last_name}
              </p>
        

              <Dropdown className="ms-auto d-inline my-0" align="end">
                <Dropdown.Toggle
                  variant="white"
                  className="m-0 p-0"
                  id="dropdown-autoclose-true"
                >
                  <i className="bi bi-three-dots"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => navigate(`/model/${model.model_id}`)}
                   
                  >
                    View model
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate(`/edit-model/${model.model_id}`)}
                 
                  >
                    Edit model
                  </Dropdown.Item>
               
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
}


// function getJobOnDate(model, date){
//   var numberOfDupJobs = 0;
    
//   for(let modelJob of model.Jobs){
 
    
//     for(let jobDate of modelJob.JobDates){
//       const date = new Date(jobDate.date);
    
//       if(date.getDate() === targetDate.getDate() && date.getMonth() === date.getMonth()){
        
//         numberOfDupJobs= numberOfDupJobs + 1;
      
        
//       }


//     }
   
//     if(numberOfDupJobs > 1){
    
     
//       dupModel.push(model);
//       dupJobs.add(modelJob.job_id)
//       break;
//     }

//   }

// }

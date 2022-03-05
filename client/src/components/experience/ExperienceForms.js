import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAlertContext } from "../../context/unsecured/alertContext";
import { useSessionContext } from "../../context/unsecured/sessionContext";
import ExperienceForm from "./ExperienceForm";


const ExperienceForms = ({ value, onChange }) => {
  const navigate = useNavigate();
  const { alert, alertActions } = useAlertContext();
  const {sessionActions} = useSessionContext()
  const [experiences, setExperiences] = useState(value);
  const addExperience = () => {
    setExperiences((prevExperience) => [...prevExperience, Object()]);
  };

  const handleRemoveExperience = (targetIndex) => {
    setExperiences((prevExperience) => {
      const newExperience = prevExperience.filter((experience, index) => {
        if (index !== targetIndex) {
          return experience;
        }
      });
      return newExperience;
    });
  };

  const handleOnChange = (targetIndex, e) => {
    // const tempExperiences = experiences;
    // tempExperiences.forEach((experience, index) => {
    //   if(index === targetIndex){
    //     tempExperiences[index] = {...experience, [e.target.name]: e.target.value}
    //   }
    // });
  
    setExperiences(prevExperiences => {
      
      const tempExperiencs = Array();
      for(let i = 0; i < prevExperiences.length; i++){
        if(i === targetIndex){
          tempExperiencs.push({...prevExperiences[i], [e.target.name]: e.target.value})
        }else{
          tempExperiencs.push(prevExperiences[i])
        }
      }

      return tempExperiencs;
    })
  
    // setExperiences((prevExperience) => {
    //   const tempExperience = prevExperience;
    //   for (let i = 0; i < tempExperience.length; i++) {
    //     if (i === targetIndex) {
    //       tempExperience[i] = {
    //         ...tempExperience[i],
    //         [e.target.name]: e.target.value,
    //       };
    //     }
    //   }
    //   return tempExperience;
    // });

    
  };

  const handleDeleteExperience = async (experience_id) => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_END_POINT}model/experience/${experience_id}`,
        method: "DELETE",
        withCredentials: true,
      });

      const resData = await res.data;
      setExperiences((prevExperiences) => {
        const newExperiences = prevExperiences.filter((experience) => {
          if (experience.experience_id !== experience_id) {
            return experience;
          }
        });
        return newExperiences;
      });

      alertActions.setShow(resData, "success" );
    } catch (err) {
      if (err.response.status === 401) {
        sessionActions.clearSession();
        return
       }
      console.error(err.response.data);
      alertActions.setShow( err.response.data, "danger" );
    }
  };

  useEffect(() => {
    onChange(experiences);
  }, [experiences]);
  

  return (
    <Container>
      <Row className=" px-2">
        {experiences.map((experience, index) => {
          return (
            <ExperienceForm
          
              onDelete={handleDeleteExperience}
              key={index}
              data={experience}
              index={index}
              onRemove={handleRemoveExperience}
              onChange={handleOnChange}
            />
          );
        })}

        <Col md="3" xs="12" className="g-3 mb-4">
          <Button onClick={addExperience} variant="light">
            Add Experience
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ExperienceForms;

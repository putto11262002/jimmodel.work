import { useState } from "react";
import { Container, FormControl, ListGroup, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import useSearchJob from "../../hooks/useSearchJob";
import { useUpdateJobModalContext } from "../../context/secured/updateJobModalContext";
import docService from "../../services/doc.service";
import { useJobModalContext } from "../../context/secured/jobModalContext";
import { useAlertContext } from "../../context/unsecured/alertContext";
import { useJobContext } from "../../context/secured/jobContext";
import { useOptionModalContext } from "../../context/secured/optionModalContext";
import OptionListGroupItem from "../option/OptionListGroupItem";
import JobListGroupItem from "./JobListGroupItem";
export default function SearchJob() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { jobModalActions } = useJobModalContext();
  const { searchResults, loading, error } = useSearchJob(searchTerm);
  const { optionModalActions } = useOptionModalContext();
  const { updateOptionModalActions } = useUpdateJobModalContext();
  const { updateJobModalActions } = useUpdateJobModalContext();
  const { alertActions } = useAlertContext();
  const { jobActions } = useJobContext();
  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
  }

  async function getJobConfirmation(job_id) {
    try {
      const res = await docService.getJobConfirmation(job_id);
      const resData = await res.data;
      const file = new Blob([resData], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (err) {
      console.error(err.response.data);
      alertActions.setShow(err.response.data, "danger");
    }
  }

  async function handleDeleteJob(job_id) {
    try {
      await jobActions.deleteJob(job_id);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteOption(job_id) {
    try {
      await jobActions.deleteOption(job_id);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Container className="position-relative w-100 p-0" fluid>
      <FormControl
        onChange={handleSearchTermChange}
        type="text"
        placeholder="search job/option..."
      />
      <ListGroup className="position-absolute w-100 shadow" style={{zIndex: 10}}>
        {searchResults.map((job, index) => {
         if(job.status){
           return <JobListGroupItem data={job} key={index} />
         }else{
          return <OptionListGroupItem data={job} key={index}/>
          
         }
        })}
      </ListGroup>
    </Container>
  );
}

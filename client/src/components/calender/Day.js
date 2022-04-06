import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useAlertContext } from "../../context/unsecured/alertContext";
import { useJobContext } from "../../context/secured/jobContext";
import Fitting from "./Fitting";
import { dateFormatter } from "../../helper/Formatter";
import Job from "./Job";
import Option from "./Option";
import { useDayModalContext } from "../../context/secured/dayModalContext";

export default function Day({ data }) {
  const tempJobs = [];

  const { alertActions } = useAlertContext();
  const { dayModalActions } = useDayModalContext();

  const [jobs, setJobs] = useState([]);
  const { jobActions, infiniteScrolling } = useJobContext();
  const { loading } = infiniteScrolling;
  function handleClick(e) {
    e.preventDefault();
    if (jobs.length < 1) {
      alertActions.setShow(
        `${dateFormatter(data.date)} does not has any event`,
        "warning"
      );
      return;
    }
    dayModalActions.setShow({ jobs: jobs, date: data.date });
  }

  useEffect(async () => {
    if (!loading) {
      for (let job of data.jobs) {
        if(job.type === "block_model"){
          tempJobs.push(job);
          

        }else{

      
        try {
          const fetchedJob = job.status
            ? await jobActions.getJob(job.job_id)
            : await  jobActions.getOption(job.job_id);
          tempJobs.push({ ...fetchedJob, type: job.type,  Models: job.Models.sort((model1, model2) => model1.duplicated === model2.duplicated ? 0 : model1.duplicated ? -1 : 1)});
        } catch (err) {
          console.error(err);
        }
      }
      }

 
     
      tempJobs.sort((job1, job2) => {
      
        const job1createdDate = new Date(job1.createdAt);
        const job2createdDate = new Date(job2.createdAt);

        return    job1createdDate.getTime() - job2createdDate.getTime()
      });

      // tempJobs.sort((job1, job2) => {
      //   return job1.type === job2.type ? 0 : job1.type === "rehearsal" ? -1 : 1;
      // });

      // tempJobs.sort((job1, job2) => {
      //   return job1.type === job2.type ? 0 : job1.type === "fitting" ? -1 : 1;
      // });

      tempJobs.sort((job1, job2) => {
        return job1.status === job2.status ? 0 : job1.status ? -1 : 1;
      });
      tempJobs.sort((job1, job2) => {
        return job1.type === job2.type ? 0 : job1.type === "job" ? -1 : 1;
      });
      tempJobs.sort((job1, job2) => {
        return job1.type === job2.type ? 0 : job1.type === "block_model" ? -1 : 1; 
      })

      setJobs(tempJobs);
    }
  }, [data, loading]);

  return (
    <div
      onClick={handleClick}
      className="d-flex flex-column justify-content-start align-items-center w-100 h-100 overflow-hidden "
    >
      <p className="m-0 fs-7">{data.date.getDate()}</p>
      <ListGroup className="d-flex flex-column justify-content-start align-items-center w-100 h-100">
        {jobs.slice(0, jobs.length <= 4 ? 4 : 3).map((job, index) => {
          const models = job.Models
       
       
       
          
          return (
            <ListGroupItem
              key={index}
              className={`fs-sm py-1 w-100 px-2 overflow-hidden text-break text-truncate word-break border-white fw-bold shadow rounded border-white ${
               ( job.type === "fitting" && job.status) && "bg-fitting"
              } ${job.type === "job" && "bg-dark text-white"} ${job.type === "final_meeting" && "bg-final-meeting"} ${(job.type === "rehearsal" && job.status) && 'bg-rehearsal'} ${job.type === "block_model" && "bg-block-model"}`}
              style={{
                background:(! job.status  && job.type !== "block_model")&& `${job.User.colour}`,
              }}
            >
           
            {models.map((model, index) => {
             
              if(job.type === "job" || (job.type === "fitting" && job.status) || job.type === "block_model" || (job.type === "rehearsal" && job.status)){
                return <span key={index} className="fw-bold">{(model.nickname === null ? model.first_name : model.nickname) + (index !== models.length - 1 ? ", " : "")}</span>
              }else{
                return <span key={index} className="fw-normal">{(model.nickname === null ? model.first_name : model.nickname) + (index !== models.length - 1 ?", " : "")}</span>
              }
            })}
           
            </ListGroupItem>
          );
        })}

        {!(jobs.length <= 4) && (
          <div className="w-100 m-0 p-0 border-0">
            <ListGroupItem className="fs-sm py-1 px-2 border-white bg-light">
              more
            </ListGroupItem>
          </div>
        )}
      </ListGroup>
    </div>
  );
}

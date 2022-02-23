import { useEffect,  useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useAlertContext } from "../../../context/unsecured/alertContext";
import { useJobContext } from "../../../context/secured/jobContext";
import Fitting from "./Fitting";
import { dateFormatter } from "../../../helper/Formatter";
import Job from "./Job";
import Option from "./Option";
import { useDayModalContext } from "../../../context/secured/dayModalContext";

export default function Day({ data}) {
  const tempJobs = [];

  const {alertActions}  = useAlertContext();
  const {dayModalActions} = useDayModalContext()

  const [jobs, setJobs] = useState([]);
  const { jobActions, infiniteScrolling } = useJobContext();
  const { loading } = infiniteScrolling;
  function handleClick(e){
    e.preventDefault();
    if(jobs.length < 1){
      alertActions.setShow(`${dateFormatter(data.date)} does not has any event`, 'warning');
      return 
    }
    dayModalActions.setShow({jobs: jobs, date: data.date})



  }

 
  useEffect(async () => {
    if (!loading) {
      for (let job of data.jobs) {
      
          try {
            const fetchedJob = await job.status ? jobActions.getJob(job.job_id) : jobActions.getOption(job.job_id)
            tempJobs.push({ ...fetchedJob, type: job.type });
          } catch (err) {
            console.error(err);
          }
       
      }

      setJobs(tempJobs);
    }
  }, [data, loading]);

  return (
    <div
    onClick={handleClick}

      className="d-flex flex-column justify-content-start align-items-center w-100 h-100"
      
    >
      <p className="m-0 fs-7">{data.date.getDate()}</p>
      <ListGroup className="d-flex flex-column justify-content-start align-items-center w-100 h-100">
        {jobs.slice(0, jobs.length <= 4 ? 4 : 3).map((job, index) => {
          if (job.type === "option") {
            return <Option key={index} data={job} />;
          } else if (job.type === "job") {
            return <Job key={index} data={job} />;
          } else if(job.type === 'fitting') {
            return <Fitting key={index} data={job} />;
          }
        })}

        {!(jobs.length <= 4) && (
          <div  className="w-100 m-0 p-0 border-0">
            <ListGroupItem className="fs-sm py-1 px-2 border-white bg-light">
              more
            </ListGroupItem>
          </div>
        )}
      </ListGroup>
    </div>
  );
}

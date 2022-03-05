import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import jobService from "../../services/job.service";
import { useAlertContext } from "../unsecured/alertContext";

import { useSessionContext } from "../unsecured/sessionContext";
const jobContext = createContext();
const limit = 10;
export function useJobContext() {
  return useContext(jobContext);
}

export default  function JobContextProvider({ children }) {
  const { alert, alertActions } = useAlertContext();
  const [jobs, setJobs] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {sessionActions, user} = useSessionContext();


  useEffect(async () => {
    let source = axios.CancelToken.source();
    try {
      setError(false);
      const offset = (currentPage - 1) * limit;
      const res = await jobService.getJobs(limit, offset, source.token);
      const fetchedData = await res.data;
      if (fetchedData.length < limit) {
        setHasMore(false);
      }
      const fetchedJobs = Array();
      const fetchedOptions = Array();
      for (let item of fetchedData) {
        if (item.status) {
          fetchedJobs.push(item);
        } else {
          fetchedOptions.push(item);
        }
      }
      setJobs((prevJobs) => [...prevJobs, ...fetchedJobs]);
      setOptions((prevOptions) => [...prevOptions, ...fetchedOptions]);
      setLoading(false);
    } catch (err) {
      if (err.response.status === 401) {
        sessionActions.clearSession();
        return Promise.reject()
       }
      alertActions.setShow(err.response.data, "danger");
      setError(true);
      setLoading(false);
    }
    return () => source.cancel();
  }, [currentPage]);

  function loadMore(){
    setCurrentPage(prevPage => prevPage+1)
  }

  function getJob(job_id) {
    for (let job of jobs) {
      if (job.job_id === job_id) {
        return job;
      }
    }

    return jobService
      .getJob(job_id)
      .then((res) => res.data)
      .then((fetchedJob) => {
        setJobs((prevJobs) => [...prevJobs, fetchedJob]);
        return Promise.resolve(fetchedJob);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          sessionActions.clearSession();
          return Promise.reject()
         }
        alertActions.setShow(err.response.data, "danger");
        return Promise.reject(err.response.data);
      });
  }

  function getOption(job_id) {
    for (let option of options) {
      if (option.job_id === job_id) {
        return option;
      }
    }

    return jobService
      .getJob(job_id)
      .then((res) => res.data)
      .then((fetchedOption) => {
        setOptions((prevOptions) => [...prevOptions, fetchedOption]);
        return Promise.resolve(fetchedOption);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          sessionActions.clearSession();
          return Promise.reject()
         }
        alertActions.setShow(err.response.data, "danger");
        return Promise.reject(err.response.data);
      });
  }

  async function updateJob(job_id, job){
    try{
      job.JobDates = JSON.stringify(job.JobDates.map(jobDate => {
        return {...jobDate, date: new Date(jobDate.date.getTime() - (jobDate.date.getTimezoneOffset() * 60000))}
      }))
      

      job = Object.fromEntries(
        Object.entries(job).filter(([_, v]) => v != null)
      );

    
    
      job.Models = JSON.stringify(job.Models.map(model => model.model_id));
      job.fitting_date = new Date(job.fitting_date);
      job.shooting_start = new Date(job.shooting_start);
      job.shooting_end = new Date(job.shooting_end);
      const res = await jobService.updateJob(job_id, job)
      const updatedJob = await res.data;
    
      const jobTargetIndex = getJobIndex(job_id, jobs);
      const optionTargetIndex = getJobIndex(job_id, options)
      if(updatedJob.status){
        if(optionTargetIndex !== -1){
          setOptions(prevOptions =>  {
            const newOptions = prevOptions.filter(option => option.job_id !== job_id);
           
            return newOptions
          })
        }
      

        if(jobTargetIndex !== - 1){
          setJobs(prevJobs => {
            const tempJobs = prevJobs;
            tempJobs[jobTargetIndex] = updatedJob;
            return tempJobs
          })
        }else{
          setJobs(prevJobs => [...prevJobs, updatedJob])
        }

      }else{
        if(optionTargetIndex !== - 1){
          
          setOptions(prevOptions => {
            const tempJobs = prevOptions;
            tempJobs[optionTargetIndex] = updatedJob;
           
            return tempJobs
          })
        }


      }
      alertActions.setShow('Job successfully updated.', 'success');
     
      return Promise.resolve(updatedJob)

    }catch(err){
      if (err.response.status === 401) {
        sessionActions.clearSession();
        return Promise.reject()
       }
      
      alertActions.setShow(err.response.data, "danger");
      return Promise.reject(err.response.data);
   

  

    }



  }

  async function createJob(job) {
    try {
      job.JobDates = JSON.stringify(job.JobDates.map(jobDate => {
        return {...jobDate, date: new Date(jobDate.date.getTime() - (jobDate.date.getTimezoneOffset() * 60000))}
      }))
      job.booked_by = user.user_id;
      job.status = true;
      job.Models = JSON.stringify(job.Models.map(model => model.model_id));
    

      const res = await jobService.createJob(job);
      const createdJob = await res.data;
      
      setJobs((prevJobs) => [...prevJobs, createdJob]);
      alertActions.setShow("Job successfully created.", "success");
      return Promise.resolve(createdJob);
      
    } catch (err) {
      if (err.response.status === 401) {
        sessionActions.clearSession();
        return Promise.reject()
       }
      alertActions.setShow(err.response.data, "danger");
      return Promise.reject(err.response.data);
      
     
    }
   
  }
  async function createOption(option) {
    try {
     

      option.JobDates = JSON.stringify(option.JobDates.map(jobDate => {
        return {...jobDate, date: new Date(jobDate.date.getTime() - (jobDate.date.getTimezoneOffset() * 60000))}
      }))
      option.booked_by = user.user_id
      option.status = false;
      option.Models = JSON.stringify(option.Models.map(model => model.model_id));
      option.fitting_date = new Date(option.fitting_date);
      option.shooting_start = new Date(option.shooting_start);
      option.shooting_end = new Date(option.shooting_end);

      const res = await jobService.createJob(option);
      const createdOption = await res.data;
      if(createdOption.title === "Not available") return Promise.resolve(createdOption)
      setOptions((prevOptions) => [...prevOptions, createdOption]);
      alertActions.setShow("Job successfully created.", "success");
      return Promise.resolve(createdOption);
    } catch (err) {
     
      if (err.response.status === 401) {
        sessionActions.clearSession();
       
       
       }
      alertActions.setShow(err.response.data, "danger");
      return Promise.reject(err.response.data);
    }
  }

  async function deleteOption(job_id){
    try{
      const res = await jobService.deleteJob(job_id);
      const data = res.data;
      setOptions(prevOptions => {
        return prevOptions.filter(option => {
          if(option.job_id !== job_id){
            return option
          }
        })
      })
      alertActions.setShow('Option successfully deleted.', 'success');
      return Promise.resolve()
    }catch(err){
      if (err.response.status === 401) {
        sessionActions.clearSession();
        return Promise.reject()
       }
    
      alertActions.setShow(err.response.data, 'danger');
      return Promise.reject(err.response.data)
    }
  }

  async function deleteJob(job_id){
    try{
      const res = await jobService.deleteJob(job_id);
      const data = res.data;
      setJobs(prevJobs => {
        return prevJobs.filter(job => {
          if(job.job_id !== job_id){
            return job
          }
        })
      })
      alertActions.setShow('Job successfully deleted.', 'success');
      return Promise.resolve()
    }catch(err){
      if (err.response.status === 401) {
        sessionActions.clearSession();
        return Promise.reject()
       }
    
      alertActions.setShow(err.response.data, 'danger');
      return Promise.reject(err.response.data)
    }
  }
  const jobStore = {
    jobs,
    options,
    infiniteScrolling: {
      loading,
      error,
      hasMore,
      loadMore
    },
    jobActions: {
      createJob,
      getJob,
      createOption,
      getOption,
      updateJob,
      updateOption: updateJob,
      deleteOption,
      deleteJob
    },
  };

  return <jobContext.Provider value={jobStore}>{children}</jobContext.Provider>;
}

const getJobIndex = (job_id, jobs) => {
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].job_id === job_id) {
      return i;
    }
  }
  return -1;
};

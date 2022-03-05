import { useEffect, useState } from "react";
import { useSessionContext } from "../context/unsecured/sessionContext";

import { getStartDate, getEndDate } from "../helper/Calender";
import jobService from '../services/job.service'
export default function useBuildCalender(currentMonth) {
    const [calender, setCalender] = useState([]);
    const [loading, setLoading]= useState(true)
    const {sessionActions} = useSessionContext()
    useEffect(async() => {
        try{
          setLoading(true)
          const tempCalender = Array()
      
        const startDate = new Date(getStartDate(currentMonth));
    
        const endDate = new Date(getEndDate(currentMonth));
        
        const res= await jobService.getJobCalender(startDate, endDate);
        const jobs = await res.data;
       
       
    
        while (startDate < endDate) {
         
           tempCalender.push({date: new Date(startDate), jobs: jobs[`${startDate.getDate()}-${startDate.getMonth() + 1}-${startDate.getFullYear()}`] === undefined ? [] : jobs[`${startDate.getDate()}-${startDate.getMonth() + 1}-${startDate.getFullYear()}`]})
          startDate.setDate(startDate.getDate() + 1);
        }

        setCalender(tempCalender)
        setLoading(false)
        }catch(err){
          setLoading(true)
          if(err.response.status == 401){
            sessionActions.clearSession();
            return
          }
          console.error(err.response)
        }
    
    }, [currentMonth])
  return {calender, loading};
}

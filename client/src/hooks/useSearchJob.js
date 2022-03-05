import axios from "axios";
import { useEffect, useState } from "react";

import { useSessionContext } from "../context/unsecured/sessionContext";

import jobService from '../services/job.service'

export default function useSearchJob(searchTerm){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {sessionActions} = useSessionContext()
    const [searchResults, setSearchResults] = useState([]);
   
    useEffect(async() => {
        let source = axios.CancelToken.source()
        if(searchTerm !== "" && searchTerm !== undefined){
           try{
            setLoading(true);
            const res = await jobService.searchJob(searchTerm, source.token);
            const data = res.data
            setSearchResults(data);
            setLoading(false)
           }catch(err){
            if(err.response.status === 401){
                sessionActions.clearSession()
            }
         
           
              setError(true);
              setLoading(false);
             
            
           }
        }else{
            setSearchResults([])
        }
        return () =>  source.cancel()
    }, [searchTerm])
    return {searchResults, loading, error}
}
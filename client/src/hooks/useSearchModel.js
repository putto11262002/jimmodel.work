import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "../context/unsecured/sessionContext";

import modelService from "../services/model.service";

export default function useSearchModel(searchTerm, date=null){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {sessionActions} = useSessionContext()
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate()
    useEffect(async() => {
        let source = axios.CancelToken.source()
        if(searchTerm !== "" && searchTerm !== undefined){
           try{
            setLoading(true);
            const res = await modelService.searchModel(searchTerm, source.token, date);
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
        return  () => source.cancel() 
    }, [searchTerm])
    return {searchResults, loading, error}
}
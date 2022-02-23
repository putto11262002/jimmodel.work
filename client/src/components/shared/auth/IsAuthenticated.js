import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSessionContext } from '../../../context/unsecured/sessionContext';
import Loader from '../Loader';
import PageWrapper from '../page/PageWrapper';

export default function IsAuthenticated({children}) {
  const {loginStatus, loading} = useSessionContext();
  const navigate = useNavigate();
  useEffect(() => {
      if(!loading){
          if(!loginStatus){
              navigate("/login")
          }
      }
  })
 

if(loginStatus){
    return children;
}else{
    return <PageWrapper><Loader/></PageWrapper>
}
  
}


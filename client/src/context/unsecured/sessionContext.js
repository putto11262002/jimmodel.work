
import { createContext, useState, useEffect } from "react";

import { useContext } from "react";
import authService from '../../services/auth.service'
import { useAlertContext } from "./alertContext";

const sesstionContext = createContext({
    isLoggedIn: () => {},
    getUsername: () => {},
    getFirstName: () => {}, 
    getLastName: () => {},
    getUserProfileUrl: () => {},
    getUserId: () => {},
    login: (username, password) => {},
    getUserRole: () => {},
    logout: () => {},
    clearSession: () => {},
    isAdmin: () => {},
    loading: Boolean,
    error: Boolean,
    
});

export function useSessionContext(){
    return useContext(sesstionContext)
}





export default function SessionContextProvider({children}){
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false)
    const [user, setUser] = useState(null);
    const [loginStatus, setLoginStatus] = useState(false) // once session is implement must be set to undefined
    const {alertActions} = useAlertContext()
  
    useEffect(async() => {
        setLoading(true);
      try{
       const res = await authService.isLoggedIn();
        const data = await res.data;
        setUser(data);
        setLoginStatus(true);
        alertActions.setShow(`Welcome back ${data.first_name} ${data.last_name}`, 'success')
        setLoading(false)
      }catch(err){
          if(err.response.status !== 401)  {
            console.error(err.response.data);
            alertActions.setShow(err.response.data, 'danger');
          }
         
          setLoginStatus(false)
          setLoading(false);
      }
    },[]);

    const isAdmin = () => {
        if(!user){
            return false
        }
        return (user.role === "admin" || user.role === "root")
    }
    const logout = async() => {
        try{
            setLoading(true);
            const res = await authService.logout();
            const data = await res.data;
          
            setLoginStatus(false);
            setUser(null);
           
            setLoading(false);
        }catch(err){
            console.error(err);
            setUser(null);
            setLoginStatus(false)
            alertActions.setShow(err.response.data, 'danger');
            setLoading(false)

        }
    }

    const clearSession = () => {
        setLoginStatus(false)
        setUser(null);
       
    }
    
   
  

    const getFirstName = () => {
        if(!user){
            return null
        }
        return user.first_name;
    }

    const getUserRole = () => {
        if(!user){
            return null;
        }
        return user.role;
    }

    const getLastName = () => {
        if(!user){
            return null
        }
        return user.last_name;
    }

    const getUsername = () => {
        if(!user){
            return null
        }
        return user.username;
    }

    const getUserId = () => {
        if(!user){
            return null;
        }
        return user.user_id;
    }



    const getProfileUrl = () => {
        if(!user){
            return null
        }
        return user.profile_img
    }

    const login = async(username, password) => {
        try{
            setLoading(true)
            const res = await  authService.login(username, password)
            const data = await res.data;
            
            setUser(data);
            setLoginStatus(true);
            alertActions.setShow(`Welcome back ${data.first_name} ${data.last_name}`, 'success')
          setLoading(false);
          return Promise.resolve()
         
        }catch(err){
            if(err.response.status !== 401){
                console.error(err.response);
              }
              alertActions.setShow(err.response.data, 'danger')
              setUser(null);
              setLoginStatus(false);
              setLoading(false);
              return Promise.reject()
            
            
        }
       
    }

    const sesstionStore = {
       loginStatus,
       user,
       loading,
       sessionActions: {
           login,
           logout,
           clearSession
       }
       

    }

    return (
        <sesstionContext.Provider value={sesstionStore}>
            {children}
        </sesstionContext.Provider>
    )


}






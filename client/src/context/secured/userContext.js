import { createContext, useContext, useEffect, useState } from "react";
import userService from "../../services/userService";
import { useAlertContext } from "../unsecured/alertContext";
import { useSessionContext } from "../unsecured/sessionContext";

const userContext = createContext();

export function useUserContext() {
  return useContext(userContext);
}

const initialUserState = Array();

export default function UserContextProvider({ children }) {
  const [users, setUsers] = useState(initialUserState);
  const { alertActions } = useAlertContext();
  const {sessionActions} = useSessionContext()

  useEffect(async () => {
    try {
      const res = await userService.getUsers();
      const data = await res.data;
      setUsers(data);
    } catch (err) {
      if (err.response.status === 401) {
        sessionActions.clearSession();
       
       }
      console.error(err);
    }
  }, []);
 

  async function createUser(data) {
    try {
      const formData = new FormData();
      for (let key in data) {
        formData.append([key], data[key]);
      }
      const res = await userService.createUser(formData);
      const createdUser = await res.data;
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      alertActions.setShow("User successfully created.", "success");
      return Promise.resolve(createdUser);
    } catch (err) {
      if (err.response.status === 401) {
        sessionActions.clearSession();
        return Promise.reject()
       }
      alertActions.setShow(err.response.data, "danger");
      return Promise.reject(err.response.data);
    }
  }

  function getUser(user_id) {
  
    for (let user of users) {
      if (user.user_id === user_id) {
        return Promise.resolve(user);
      }
    }

    return userService
      .getUser(user_id)
      .then((res) => res.data)
      .then((fetchedUser) => {
        setUsers((prevUsers) => [...prevUsers, fetchedUser]);
        return Promise.resolve(fetchedUser);
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

  async function updateUser(user_id, data) {
    try {
      data = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v != null)
      );
      const formData = new FormData();

      for (let key in data) {
        formData.append([key], data[key]);
      }

      const res = await userService.updateUser(user_id, formData);
      const updatedUser = await res.data;
      setUsers((prevUsers) => {
        return prevUsers.map((user) => {
          if (user.user_id === user_id) {
            return updatedUser;
          } else {
            return user;
          }
        });
      });

      alertActions.setShow("User successfully updated", "success");
      return Promise.resolve(updatedUser);
    } catch (err) {
      if (err.response.status === 401) {
        sessionActions.clearSession();
        return Promise.reject()
       }
      alertActions.setShow(err.response.data, "danger");
      return Promise.reject(err.reponse.data);
    }

  }


  async function deleteUser(user_id) {
    try {
      const res = await userService.deleteUser(user_id);
      const resData = await res.data;
      setUsers(prevUsers => {
        return prevUsers.filter((user) => user.user_id !== user_id)
      })

      alertActions.setShow("User successfully deleted.", 'success');
      return Promise.resolve();
    } catch (err) {
      if (err.response.status === 401) {
        sessionActions.clearSession();
        return Promise.reject()
       }
      alertActions.setShow(err.response.data, "danger");
      return Promise.reject(err.response.data);
    }
  }
  const userStore = {
    users,
    userActions: {
      createUser,
      getUser,
      updateUser,
      deleteUser,
    },
  };

  return (
    <userContext.Provider value={userStore}>{children}</userContext.Provider>
  );
}

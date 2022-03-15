import { createContext, useContext, useEffect, useState } from "react";
import { useAlertContext } from "../unsecured/alertContext";

import modelService from "../../services/model.service";
import axios from "axios";
import { useSessionContext } from "../unsecured/sessionContext";
const limit = 20;
const modelContext = createContext({});

export function useModelContext() {
  return useContext(modelContext);
}

export default function ModelContextProvider({ children }) {
  const {  alertActions } = useAlertContext();
  const [models, setModels] = useState([]);
  const [requestedModels, setRequestedModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const [modelCurrentPage, setModelCurrentNumber] = useState(1);
  const [requestedModelCurrentPage, setRequestedModelCurrentPage] = useState(1);
  const {sessionActions} = useSessionContext()

  useEffect(async () => {
    let source = axios.CancelToken.source();

    try {
      setLoading(true);
      setError(false);
      const offset = (modelCurrentPage - 1) * limit;
      const res = await modelService.getAll(limit, offset, true, source.token);
      const fetchedModels = await res.data;
     

      if (fetchedModels.length < limit) {
        setHasMore(false);
      }
      setModels((prevModels) => [...prevModels, ...fetchedModels]);
      setLoading(false);
    } catch (err) {
  
      if (err.response.status === 401) {
       sessionActions.clearSession()
      }
      alertActions.setShow(err.response.data, "danger");
      setError(true);
      setLoading(false);
    }
    return async() => await source.cancel();
  }, [modelCurrentPage]);

  useEffect(async () => {
    let source = axios.CancelToken.source();

    try {
      setLoading(true);
      setError(false);
   
      const res = await modelService.getAll(100, 0, false, source.token);
      const fetchedRequestedModels = await res.data
      
      setRequestedModels((prevRequestedModels) => [
        ...prevRequestedModels,
        ...fetchedRequestedModels,
      ].sort((model1, model2) => {
      
        const model1createdDate = new Date(model1.createdAt);
        const model2createdDate = new Date(model2.createdAt);
  
        return    model2createdDate.getTime() - model1createdDate.getTime()
      }));
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
    return async() => await source.cancel();
  }, []);

  function loadMore() {
    setModelCurrentNumber((prevPageNumber) => prevPageNumber+1);
  }

  async function getModel(model_id) {
    for (let model of models) {
      if (model.model_id === model_id) {
        return model;
      }
    }
    for (let model of requestedModels) {
      if (model.model_id === model_id) {
        return model;
      }
    }

    try {
      const res = await modelService.get(model_id);

      const fetchedModel = await res.data;

      if (fetchedModel.approved) {
        setModels((prevModels) => [...prevModels, fetchedModel]);
      } else {
        setRequestedModels((prevRequestedModel) => [
          ...prevRequestedModel,
          fetchedModel,
        ]);
      }

      return Promise.resolve(fetchedModel);
    } catch (err) {
      if (err.response.status === 401) {
        sessionActions.clearSession();
        return Promise.reject()
       }
      alertActions.setShow(err.response.data, "danger");

      return Promise.reject(err.response.data);
    }
  }

  async function deleteModel(model_id){
    try{
      const res = await modelService.delete(model_id);
      const data = await res.data;
      setModels(prevModels => {
        return prevModels.filter(model => {
          if(model.model_id !== model_id){
            return model
          }
        })
      })

      setRequestedModels(prevRequestedModels => {
        return prevRequestedModels.filter(model => {
          if(model.model_id !== model_id){
            return model
          }
        })
      })
      alertActions.setShow(data, 'success')
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

  async function createModel(data) {
    try {
      data.Experiences = JSON.stringify(data.Experiences);
      data.Measurement = JSON.stringify(data.Measurement);
      // data.profile_img = data.profile_img.filter(
      //   (profile) => profile != null || profile !== undefined
      // );

      const formData = new FormData();
      for (let key in data) {
        // if (key === "profile_img") {
        //   data.profile_img.forEach((profile) => {
        //     formData.append([key], profile, profile, profile.name);
        //   });
        // }
        formData.append([key], data[key]);
      }

      const res = await modelService.create(formData);
      const createdModel = await res.data;
      if (createdModel.approved) {
        setModels((prevModels) => [createdModel, ...prevModels]);
      } else {
        setRequestedModels((prevRequestedModel) => [
          createdModel,
          ...prevRequestedModel,
        ]);
      }

      alertActions.setShow("Model successfully created.", "success");
      return Promise.resolve(createdModel);
    } catch (err) {
      if (err.response.status === 401) {
        sessionActions.clearSession();
        return Promise.reject()
       }
      
      alertActions.setShow(err.response.data, "danger");
      return Promise.reject(err.response.data);
    }
  }

  async function updateModel(model_id, data) {
    try {
      data = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v != null)
      );

      data.Measurement = Object.fromEntries(
        Object.entries(data.Measurement).filter(([_, v]) => v != null)
      );

      data.Experiences.forEach((experience, index) => {
        data.Experiences[index] = Object.fromEntries(
          Object.entries(data.Experiences[index]).filter(([_, v]) => v != null)
        );
      });

      data.Experiences = JSON.stringify(data.Experiences);
      data.Measurement = JSON.stringify(data.Measurement);

      const formData = new FormData();
      for (let key in data) {
       
        
        formData.append([key], data[key]);
      }

      data.Experiences = JSON.stringify(data.Experiences);
      data.Measurement = JSON.stringify(data.Measurement);
      const res = await modelService.update(model_id, formData);
      const updatedModel = await res.data;
    
      const modelTargetIndex = getModelIndex(model_id, models);
      const requestedModelTargetIndex = getModelIndex(
        model_id,
        requestedModels
      );
     
      if (updatedModel.approved) {
        if (requestedModelTargetIndex !== -1) {
          setRequestedModels((prevRequestedModels) => {
            const newRequestedModels = prevRequestedModels.filter(
              (model) => {
                if (model.model_id !== model_id) {
                  return model;
                }
              }
            );
            return newRequestedModels;
          });
        }

        if (modelTargetIndex !== -1) {
          setModels((prevModels) => {
            prevModels[modelTargetIndex] = updatedModel;
            return prevModels;
          });
        } else {
          setModels((prevModels) => [...prevModels, updatedModel]);
        }
      } else {
        if (requestedModelTargetIndex !== 0) {
          setRequestedModels((prevRequestedModels) => {
            prevRequestedModels[requestedModelTargetIndex] = updatedModel;
            return prevRequestedModels;
          });
        }
      }
      alertActions.setShow("Model successfully updated", "success");
      return Promise.resolve(updatedModel);
    } catch (err) {
      if (err.response.status === 401) {
        sessionActions.clearSession();
        return Promise.reject()
       }
      alertActions.setShow(err.response.data, "danger");
      return Promise.reject(err.response.data);
    }
  }

 
  
  const modelStore = {
    models,
    requestedModels: requestedModels,
    infiniteScrolling: {
      error,
      loading,
      hasMore,
      loadMore
    },
    modelActions: {
      getModel,
      loadMore,
      createModel,
      updateModel,
      deleteModel
    },
  };

  return (
    <modelContext.Provider value={modelStore}>{children}</modelContext.Provider>
  );
}

const getModelIndex = (model_id, models) => {
  for (let i = 0; i < models.length; i++) {
    if (models[i].model_id === model_id) {
      return i;
    }
  }
  return -1;
};

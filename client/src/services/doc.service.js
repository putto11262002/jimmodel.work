import axios from "../axios";

class Doc{
    getModelProfile(model_id){
        return axios.get(`doc/model-profile/${model_id}`, {responseType: 'blob'})
       
    }
    getJobConfirmation(job_id){
        return axios.get(`doc/job-confirmation/${job_id}`, {responseType: 'blob'})
       
    }
}

export default new Doc()
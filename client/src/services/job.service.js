import http from '../axios/index';
const include = "model,user"
class JobService {
    getJobs(limit=50, offset=0, cancelToken=null){
        return http.get('job', { params: {limit, offset, include},  cancelToken})
    }
    getJob(job_id){
        return http.get(`job/${job_id}`, {params: {include}})
    }
    createJob(data){
        return http.post('job', data, {params: {include}})
    }
    updateJob(job_id, data){
        return http.put(`job/${job_id}`, data, {params: {include}})
    }
    getJobCalender(from, to){
        return http.get(`job/calender/${from}/${to}`, {params: {include}})
    }
    deleteJob(job_id){
        return http.delete(`job/${job_id}`)
    }
    searchJob(searchTerm, cancelToken=null){
        return http.get(`job/search/${searchTerm}`, {params: {include}, cancelToken})
    }
}

export default new JobService();
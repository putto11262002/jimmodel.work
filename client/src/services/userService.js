import axios from "../axios";

class UserService{
    createUser(formData){
       return axios.post('user', formData, {headers: {
        "Content-Type": "multipart/form-data",
      }})
    }

    getUsers(){
        return axios.get('user')
    }
    getUser(user_id){
        return axios.get(`user/${user_id}`)
    }
    updateUser(user_id, formData){
        return axios.put(`user/${user_id}`, formData, {headers: {
            "Content-Type": "multipart/form-data",
          }})
    }
    deleteUser(user_id){
        return axios.delete(`user/${user_id}`)
    }
}

export default new UserService()
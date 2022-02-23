import axios from "../axios";

class AuthService{
    login(username, password){
        return axios.post('auth', {username, password})
    }
    isLoggedIn(){
        return axios.get('auth')
    }
    logout(){
        return axios.delete('auth')
    }
}

export default new AuthService()
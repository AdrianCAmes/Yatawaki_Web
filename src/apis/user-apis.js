import apiInstance from "../config/api-instance";
import { PLAYER } from "../utils/consts";

const uri = 'user/';


const UserApi = {
    register: (nickname, password, firstname, lastname, mail) => apiInstance.post(`${uri}register`, {
        nickname: nickname,
        password: password, 
        firstname: firstname, 
        lastname: lastname, 
        mail: mail, 
        role: PLAYER
    }),
}

export default UserApi;
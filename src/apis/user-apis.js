import apiInstance from "../config/api-instance";
import { PLAYER } from "../utils/consts";

const uri = 'user/';

const getHeaderToken = () => {
    return { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }
};

const UserApi = {
    register: (nickname, password, firstname, lastname, mail) => apiInstance.post(`${uri}register`, {
        nickname: nickname,
        password: password,
        firstname: firstname,
        lastname: lastname,
        mail: mail,
        role: PLAYER
    }),
    resume: () => apiInstance.get(`${uri}Doppelganger/resume`, getHeaderToken()),
}

export default UserApi;
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
    resume: (username) => apiInstance.get(`${uri}${username}/resume`, getHeaderToken()),
    getUserProfileById: (userId) => apiInstance.get(`${uri}${userId}/profile`, getHeaderToken()),
    updateuser: (idUser, firstname, lastname, nickname, mail) => apiInstance.patch(`${uri}`,{
        idUser: idUser,
        firstname: firstname,
        lastname: lastname,
        nickname: nickname,
        mail: mail,
    }, getHeaderToken()),
}

export default UserApi;
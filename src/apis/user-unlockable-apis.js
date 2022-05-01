import apiInstance from "../config/api-instance";

const uri = 'user-unlockable/';

const getHeaderToken = () => {
    return { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }
};


const UserUnlockableApi = {
    findSymphoniesByUser: (userId) => apiInstance.get(`${uri}user/${userId}/symphonies`, getHeaderToken()),
    findUserUnlockable: (userId) => apiInstance.get(`${uri}user/${userId}/filtered`, getHeaderToken()),
    findUserMarket: (userId) => apiInstance.get(`${uri}user/${userId}/market`, getHeaderToken()),
    trade: (idUser, idUnlockable) => apiInstance.post(`${uri}trade`, {
        idUser: idUser,
        idUnlockable: idUnlockable
    }, getHeaderToken()),
}

export default UserUnlockableApi;
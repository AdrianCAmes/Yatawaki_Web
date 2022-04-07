import apiInstance from "../config/api-instance";

const uri = 'user-unlockable/';

const getHeaderToken = () =>  {
    return {headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` }}
};


const UserUnlockableApi = {
    findSymphoniesByUser: (userId) => apiInstance.get(`${uri}user/${userId}/symphonies`, getHeaderToken()),
    findUserUnlockable: (userId) => apiInstance.get(`${uri}user/${userId}/filtered`, getHeaderToken())
}

export default UserUnlockableApi;
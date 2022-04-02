import apiInstance from "../config/api-instance";
import { PLAYER } from "../utils/consts";

const uri = 'user-unlockable/';

const getHeaderToken = () =>  {
    return {headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` }}
};


const UserUnlockableApi = {
    findSymphoniesByUser: () => apiInstance.get(`${uri}user/1/symphonies`, getHeaderToken()),
}

export default UserUnlockableApi;
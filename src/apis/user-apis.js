import apiInstance from "../config/api-instance";

const uri = 'user/';


const UserApi = {
    authenticate: (uniqueIdentifier, password) => apiInstance.post(`${uri}authenticate`, {
        uniqueIdentifier: uniqueIdentifier,
        password: password,
    }),
}

export default UserApi;
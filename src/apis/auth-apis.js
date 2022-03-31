import apiInstance from "../config/api-instance";

const uri = 'authenticate';


const AuthApi = {
    authenticate: (uniqueIdentifier, password) => apiInstance.post(uri, {
        uniqueIdentifier: uniqueIdentifier,
        password: password,
    })
}

export default AuthApi;
import apiInstance from "../config/api-instance";

const uri = 'symphony-instrument/';

const getHeaderToken = () =>  {
    return {headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` }}
};


const SymphonyApis = {
    findInstrumentsBySymphonyId: (symphonyId) => apiInstance.get(`${uri}symphony/${symphonyId}/instruments`, getHeaderToken()),
}

export default SymphonyApis;
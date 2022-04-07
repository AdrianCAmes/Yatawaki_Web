import apiInstance from "../config/api-instance";

const uri = 'instrument/';

const getHeaderToken = () =>  {
    return {headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` }}
};


const InstrumentApis = {
    findInstrumentsByName: (name) => apiInstance.get(`${uri}name/${name}`, getHeaderToken()),
}

export default InstrumentApis;
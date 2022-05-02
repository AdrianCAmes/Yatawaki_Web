import apiInstance from "../config/api-instance";

const uri = 'concert/';

const getHeaderToken = () => {
    return { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }
};


const ConcertApis = {
    concertComplete: () => apiInstance.post(`${uri}complete`, {
        idConcert: 1,
        gainedExperience: 700,
        points: 600,
        accuracyRate: 88,
        gesturesCompleted: 10,
        gainedCoins: 110
    }, getHeaderToken()),

    startConcert: () => apiInstance.post(`${uri}start`, {
        idUser: 1,
        idSymphony: 1,
    }, getHeaderToken()),
}

export default ConcertApis;
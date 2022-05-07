import apiInstance from "../config/api-instance";

const uri = 'concert/';

const getHeaderToken = () => {
    return { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }
};


const ConcertApis = {
    concertComplete: (idConcert, points, accuracyRate, gesturesCompleted, gainedExperience, gainedCoins) => apiInstance.post(`${uri}complete`, {
        idConcert: idConcert,
        gainedExperience: gainedExperience,
        points: points,
        accuracyRate: accuracyRate,
        gesturesCompleted: gesturesCompleted,
        gainedCoins: gainedCoins
    }, getHeaderToken()),

    startConcert: () => apiInstance.post(`${uri}start`, {
        idUser: 1,
        idSymphony: 1,
    }, getHeaderToken()),
}

export default ConcertApis;
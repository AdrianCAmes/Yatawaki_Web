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

    startConcert: (symId) => apiInstance.post(`${uri}start`, {
        idUser: 1,
        idSymphony: symId,
    }, getHeaderToken()),
}

export default ConcertApis;
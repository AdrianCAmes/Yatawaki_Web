import { createContext, useEffect, useState } from "react";


const GameContext = createContext({
    userId: 0,
    showTutorials: null,
    setShowTutorials: null,
    updateUser: null,
    username: '',
    updateUsername: null,
    logout: null,
    instruments: [],
    updateInstruments: null,
    updateInstrumentsByIndex: null
})

export default GameContext;

export const GameContextProvider = (props) => {
    const [userId, setUserId] = useState(0);
    const [showTutorials, setShowTutorials] = useState(true);
    const [username, setUsername] = useState('');
    const [instruments, setInstruments] = useState([]);

    const updateUserId = (userIdRequest) => {
        setUserId(userIdRequest);
    };

    const updateInstruments = (instrumentsR) => {
        setInstruments(instrumentsR);
    };

    const updateInstrumentsByIndex = (intrumentR, idx) => {
        let copyInstruments = [...instruments]; // copying the old datas array
        copyInstruments[idx] = intrumentR;
        setInstruments(copyInstruments);
    };



    const updateUsername = (usernameRequest) => {
        setUsername(usernameRequest);
    };

    const logout = () => {
        setUsername('');
        setUserId(0);
    };

    // SI QUIERE RECARGAR LA PAGINA Y PERSISTIR DATA

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'));
        }
        if (localStorage.getItem('username')) {
            setUsername(localStorage.getItem('username'));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('userId', userId);
    }, [userId]);

    useEffect(() => {
        localStorage.setItem('username', username);
    }, [username]);

    useEffect(() => {
        localStorage.setItem('showTutorials', showTutorials);
    }, [showTutorials]);

    return (
        <GameContext.Provider value={{
            userId: userId,
            updateUser: updateUserId,
            showTutorials: showTutorials,
            setShowTutorials: setShowTutorials,
            username: username,
            updateUsername: updateUsername,
            logout: logout,
            instruments: instruments,
            updateInstruments: updateInstruments,
            updateInstrumentsByIndex: updateInstrumentsByIndex
        }}>
            {props.children}
        </GameContext.Provider>
    )
}
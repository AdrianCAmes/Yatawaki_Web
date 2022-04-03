import { createContext, useEffect, useState } from "react";


const GameContext = createContext({
    userId: 0,
    updateUser: null,
    username: '',
    updateUsername: '',
})

export default GameContext;

export const GameContextProvider = (props) => {
    const [userId, setUserId] = useState(0);
    const [username, setUsername] = useState('');

    const updateUserId = (userIdRequest) => {
        setUserId(userIdRequest);
    };

    const updateUsername = (usernameRequest) => {
        setUsername(usernameRequest);
    };

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
        localStorage.setItem('username', username);
    }, [userId, username]);


    return (
        <GameContext.Provider value={{
            userId: userId,
            updateUser: updateUserId,
            username: username,
            updateUsername: updateUsername,
        }}>
            {props.children}
        </GameContext.Provider>
    )
}
import { createContext, useEffect, useState } from "react";


const GameContext = createContext({
    userId: 0,
    updateUser: null,
    username: '',
    updateUsername: null,
    logout: null
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

    const logout = () => {
        setUsername('');
        setUserId(0);
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
    }, [userId]);

    useEffect(() => {
        localStorage.setItem('username', username);
    }, [username]);


    return (
        <GameContext.Provider value={{
            userId: userId,
            updateUser: updateUserId,
            username: username,
            updateUsername: updateUsername,
            logout: logout
        }}>
            {props.children}
        </GameContext.Provider>
    )
}
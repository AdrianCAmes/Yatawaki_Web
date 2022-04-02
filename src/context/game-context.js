import { createContext, useEffect, useState } from "react";


const GameContext = createContext({
    userId: 0,
    updateUser: null
})

export default GameContext;

export const GameContextProvider = (props) => {
    const [userId, setUserId] = useState(0);

    const updateUserId = (userIdRequest) => {
        setUserId(userIdRequest);
    };

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('userId', userId);
    }, [userId]);


    return (
        <GameContext.Provider value={{
            userId: userId,
            updateUser: updateUserId
        }}>
            {props.children}
        </GameContext.Provider>
    )
}
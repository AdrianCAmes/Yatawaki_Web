import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../config/init-firebase'

const AuthContext = createContext({
    currentUser: null,
    register: () => Promise
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }


    const value = {
        currentUser,
        register
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
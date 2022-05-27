import { confirmPasswordReset, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../config/init-firebase'

const AuthContext = createContext({
    currentUser: null,
    register: () => Promise,
    forgotPassword: () => Promise,
    resetPassword: () => Promise
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function forgotPassword(email) {
        return sendPasswordResetEmail(auth, email, { url: 'http://localhost:3000/login' })
    }

    function resetPassword(oobCode, newPassword) {
        return confirmPasswordReset(auth, oobCode, newPassword)
    }

    const value = {
        currentUser,
        register,
        forgotPassword,
        resetPassword
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
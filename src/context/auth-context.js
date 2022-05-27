import { confirmPasswordReset, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import React, { createContext, useContext } from 'react'
import { auth } from '../config/init-firebase'

const AuthContext = createContext({
    register: () => Promise,
    forgotPassword: () => Promise,
    resetPassword: () => Promise
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {

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
        register,
        forgotPassword,
        resetPassword
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
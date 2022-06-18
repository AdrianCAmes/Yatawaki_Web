import { confirmPasswordReset, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import React, { createContext, useContext } from 'react'
import { auth } from '../config/init-firebase'

const AuthContext = createContext({
    registerF: () => Promise,
    forgotPassword: () => Promise,
    resetPassword: () => Promise
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {

    function registerF(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function forgotPassword(email) {
        return sendPasswordResetEmail(auth, email, { url: 'http://localhost:3000/login' });
    }

    function resetPassword(oobCode, newPassword) {
        return confirmPasswordReset(auth, oobCode, newPassword)
    }

    const value = {
        registerF: registerF,
        forgotPassword,
        resetPassword
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
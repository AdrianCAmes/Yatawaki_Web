// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getAnalytics} from "firebase/analytics"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAX8NzsR-xGeLn_ZB2-_BE9s4RfevEMXNY",
    authDomain: "yatawaki-react.firebaseapp.com",
    projectId: "yatawaki-react",
    storageBucket: "yatawaki-react.appspot.com",
    messagingSenderId: "131388976324",
    appId: "1:131388976324:web:72b52787a769f086656d91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app)
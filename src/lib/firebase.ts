import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "Your-id",
  "appId": "Your-App-Id",
  "apiKey": "Your-ApiKey",
  "authDomain": "Your-Domain",
  "measurementId": "",
  "messagingSenderId": "YourSenderId"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

    

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "studio-2498172584-c377b",
  "appId": "1:880540770497:web:edde11849e8477a23ff440",
  "apiKey": "AIzaSyBC1ZG0Zzb2Pd_SDjkMzROy4uwAT8XueLA",
  "authDomain": "studio-2498172584-c377b.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "880540770497"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

    
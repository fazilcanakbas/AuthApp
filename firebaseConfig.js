import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase yapılandırması - verdiğiniz JSON dosyasından alınan bilgiler
const firebaseConfig = {
  apiKey: "AIzaSyAFUxF38VpRaNDLRe3j8aDvXDzipIpuCM4",
  authDomain: "authapp1-20371.firebaseapp.com", // Project ID + .firebaseapp.com
  projectId: "authapp1-20371",
  storageBucket: "authapp1-20371.firebasestorage.app",
   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
  // messagingSenderId eksik, Firebase konsolundan almanız gerekir
  // appId eksik, Firebase konsolundan almanız gerekir
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };



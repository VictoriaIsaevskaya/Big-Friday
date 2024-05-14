import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

export const environment = {
  firebase: {
    apiKey: "AIzaSyAilTrmF_eDCvtxOz1GAh6hpDebvk9hg2g",
    authDomain: "big-friday.firebaseapp.com",
    projectId: "big-friday",
    storageBucket: "big-friday.appspot.com",
    messagingSenderId: "663869675591",
    appId: "1:663869675591:web:c78d65f107b4fcc693f962",
    measurementId: "G-C9TLJRGPJQ"
  },
  production: true
};

// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);

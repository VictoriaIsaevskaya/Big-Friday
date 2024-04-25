// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

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
  production: false,
};

// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

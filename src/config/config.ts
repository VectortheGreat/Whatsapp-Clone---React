import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
  firebaseConfig: {
    apiKey: "AIzaSyDU6Cj77ond7P7Qw2HhpxLYhaiUxdIV4T0",
    authDomain: "whatsapp-clone-20e0a.firebaseapp.com",
    projectId: "whatsapp-clone-20e0a",
    storageBucket: "whatsapp-clone-20e0a.appspot.com",
    messagingSenderId: "633814386791",
    appId: "1:633814386791:web:554dd5115de1e846bb6cc2",
    measurementId: "G-ZCV1M1CZ82",
  },
};

const appFBConfig = initializeApp(config.firebaseConfig);
export const authFBConfig = getAuth(appFBConfig);
export default appFBConfig;

import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDwmNFthA2IN-bC6W-zLz7y4wGs55Vqcu0",
    authDomain: "twitter-clone-f57cb.firebaseapp.com",
    projectId: "twitter-clone-f57cb",
    storageBucket: "twitter-clone-f57cb.appspot.com",
    messagingSenderId: "492278305400",
    appId: "1:492278305400:web:9d9d1929792351510bd38d",
    measurementId: "G-2790M5BLGH"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);


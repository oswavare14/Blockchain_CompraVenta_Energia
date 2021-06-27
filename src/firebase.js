import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBStjo1nPApeV80ycy-lkw5IJxXayP_R1E",
    authDomain: "proyecto-vanguardia.firebaseapp.com",
    projectId: "proyecto-vanguardia",
    storageBucket: "proyecto-vanguardia.appspot.com",
    messagingSenderId: "42408357223",
    appId: "1:42408357223:web:886e599d3d4502329e53c2"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
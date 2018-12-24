import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyALiBQLn0FFSlEL1bKqdRg6C9EpAZWflwg",
    authDomain: "thinkspaces-a730b.firebaseapp.com",
    databaseURL: "https://thinkspaces-a730b.firebaseio.com",
    projectId: "thinkspaces-a730b",
    storageBucket: "thinkspaces-a730b.appspot.com",
    messagingSenderId: "656139817289"
};

firebase.initializeApp(config);

export default firebase;
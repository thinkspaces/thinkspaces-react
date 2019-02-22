import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = { apiKey: 'AIzaSyALiBQLn0FFSlEL1bKqdRg6C9EpAZWflwg',
  authDomain: 'thinkspaces-a730b.firebaseapp.com',
  databaseURL: 'https://thinkspaces-a730b.firebaseio.com',
  projectId: 'thinkspaces-a730b',
  storageBucket: 'thinkspaces-a730b.appspot.com',
  messagingSenderId: '656139817289' };

firebase.initializeApp(config);

const db = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

const storage = firebase.storage();
const auth = firebase.auth();

const createTimestamp = timestamp => firebase.firestore.Timestamp.fromDate(timestamp);

const { FieldValue } = firebase.firestore;

export { db, auth, storage, createTimestamp, FieldValue };

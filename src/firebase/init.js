import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyACPkFR__88dJSv4XMyfXxqkgVfzZGUJTI",
  authDomain: "brownbear-db9f1.firebaseapp.com",
  databaseURL: "https://brownbear-db9f1.firebaseio.com",
  projectId: "brownbear-db9f1",
  storageBucket: "brownbear-db9f1.appspot.com",
  messagingSenderId: "21793231905",
  appId: "1:21793231905:web:92e1308cf2b1051c47bf60",
  measurementId: "G-42X586FM42"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp.firestore()
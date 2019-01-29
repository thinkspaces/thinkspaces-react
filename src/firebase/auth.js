import { auth } from "./firebase";

export const createUser = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const signInUser = (email, password) =>
  auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if(errorCode === 'auth/wrong-password') {
          alert ('Wrong password');
      } else if(errorCode === 'auth/invalid-email') {
          alert ('Invalid Email');
      } else {
          alert(errorMessage);
      }
  });

export const signOutUser = () => auth.signOut();

export const isLoggedIn = () => {
    var user = auth.currentUser;
    var loggedIn = false;
    if (user) {
        loggedIn = true;
    }
    return loggedIn;
}

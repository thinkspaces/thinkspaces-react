import { auth } from "./firebase";

export const createUser = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const signInUser = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signOutUser = () => auth.signOut();

export const isLoggedIn = () => !!auth.currentUser;

// export const verifyUser = () => {
//     var user = auth.currentUser;

//     user.sendEmailVerification().then(function() {
//       // Email sent.
//     }).catch(function(error) {
//       // An error happened.
//     });
// }

export const passwordResetEmail = email => auth.sendPasswordResetEmail(email);
